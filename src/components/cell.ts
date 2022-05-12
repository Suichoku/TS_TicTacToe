import { state } from '../app.js';
import { settings } from '../config/settings.js';
import { AutoBind } from '../utility/autobind-decorator.js';

export class Cell {
  empty: boolean;
  player: boolean | undefined; // true: cross | false: circle

  constructor(public cellHTML: HTMLDivElement, private updateTurn: () => void) {
    this.empty = true;
    this.cellHTML.addEventListener('click', this.clickHandler);
  }

  @AutoBind
  clickHandler(e: Event) {
    const div = e.target as HTMLDivElement;
    // Check if interacting with the cell is allowed
    if (this.empty && !state.victory) {
      this.player = state.turn; // Claim cell for current player
      this.empty = false;
      div.classList.add(settings.getCssClass(state.turn)); // Update css styling
      div.textContent = settings.getSymbol(state.turn);
      this.updateTurn(); // Call turnChangeHandler reference to update state
    }
  }

  reset() {
    // reset css styling
    this.cellHTML.classList.remove(
      settings.getCssClass(true),
      settings.getCssClass(false),
      settings.victoryCss
    );
    this.cellHTML.textContent = '';
    this.empty = true;
    this.player = undefined;
  }
}
