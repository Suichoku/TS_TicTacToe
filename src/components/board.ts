import { settings } from '../config/settings.js';
import { Cell } from './cell.js';

export class Board {
  cells: Cell[][];

  constructor(updateTurn: () => void) {
    this.cells = [];
    const cellDivs = [
      ...document.getElementById('container')!.children,
    ] as HTMLDivElement[];

    for (let i = 0; i < cellDivs.length; i += settings.boardSize) {
      const row = cellDivs.slice(i, i + settings.boardSize);
      this.cells.push(row.map((div) => new Cell(div, updateTurn)));
    }
  }

  resetCells() {
    // loop through 2d array and reset every cell
    this.cells.map((row) => row.map((cell) => cell.reset()));
  }
}
