import { Board } from './components/board.js';
import { Cell } from './components/cell.js';
import { settings } from './config/settings.js';
import { AutoBind } from './utility/autobind-decorator.js';

export const state = {
  turn: true,
  victory: false,
  score: {
    cross: 0,
    circle: 0,
  },
};

class Game {
  turnSpan: HTMLSpanElement;
  resetBtn: HTMLButtonElement;
  scoreCross: HTMLSpanElement;
  scoreCircle: HTMLSpanElement;
  container: HTMLDivElement;
  board: Board;

  constructor() {
    this.turnSpan = document.getElementById('turn') as HTMLSpanElement;
    this.scoreCross = document.getElementById('cross') as HTMLSpanElement;
    this.scoreCircle = document.getElementById('circle') as HTMLSpanElement;
    this.resetBtn = document.getElementById('reset') as HTMLButtonElement;
    this.container = document.getElementById('container') as HTMLDivElement;

    for (let i = 0; i < settings.boardSize * settings.boardSize; i++) {
      const div = document.createElement('div');
      div.classList.add('cell', 'center');
      this.container.appendChild(div);
    }

    this.board = new Board(this.changeTurn);
    this.turnSpan.textContent = settings.getSymbol(state.turn);
    this.scoreCross.textContent = settings.getScoreText(
      true,
      state.score.cross
    );
    this.scoreCircle.textContent = settings.getScoreText(
      false,
      state.score.circle
    );

    this.resetBtn.addEventListener('click', this.restart);
  }

  @AutoBind
  changeTurn() {
    const victoryState = this.checkVictory(this.board.cells);
    if (!victoryState.winner) {
      state.turn = !state.turn;
      this.turnSpan.textContent = settings.getSymbol(state.turn);
    } else {
      state.victory = true;
      if (victoryState)
        if (victoryState.player) {
          state.score.cross += 1;
          this.scoreCross.textContent = settings.getScoreText(
            true,
            state.score.cross
          );
        } else {
          state.score.circle += 1;
          this.scoreCircle.textContent = settings.getScoreText(
            false,
            state.score.circle
          );
        }
    }
  }

  @AutoBind
  restart() {
    this.board.resetCells();
    state.turn = true;
    state.victory = false;
    this.turnSpan.textContent = settings.getSymbol(state.turn);
  }

  checkVictory(cells: Cell[][]) {
    // Checks if any of the slices (column/row/diagonal)
    // and if any do have victory: highlight that slice
    const checkSlices = (...slices: Cell[][]) => {
      for (const slc of slices) {
        // check if all cells are filled
        if (!slc.some((cell) => cell.empty)) {
          if (
            slc.every((cell) => cell.player) ||
            slc.every((cell) => !cell.player)
          ) {
            // add 'victory' css class to highlight winning row
            slc.map((cell) => cell.cellHTML.classList.add(settings.victoryCss));
            return { winner: true, player: slc[0].player! };
          }
        }
      }
      return { winner: false, player: true };
    };

    // Check rows for victory
    for (let row_index = 0; row_index < settings.boardSize; row_index++) {
      const result = checkSlices(cells[row_index]);
      if (result.winner) {
        return result;
      }
    }
    // Check columns for victory
    for (let col_index = 0; col_index < settings.boardSize; col_index++) {
      // create column slice
      let col = [];
      for (const row of cells) {
        col.push(row[col_index]);
      }
      const result = checkSlices(col);
      if (result.winner) {
        return result;
      }
    }
    // Check diagonals for victory
    const diagonal1 = []; // desceding diagonal slice
    for (let i = 0; i < settings.boardSize; i++) {
      diagonal1.push(cells[i][i]);
    }
    const diagonal2 = []; // ascending diagonal slice
    for (let i = 0; i < settings.boardSize; i++) {
      diagonal2.push(cells[i][settings.boardSize - (i + 1)]);
    }
    const result = checkSlices(diagonal1, diagonal2);
    if (result.winner) {
      return result;
    }
    return { winner: false, player: true }; // no winner found
  }
}

new Game();
