const turnSpan = document.getElementById('turn'); // Current Turn: <span>
const resetBtn = document.getElementById('reset');
const cells = document.getElementById('container').children;

const state = {
  turn: true, // true: cross, false: circle
  getSymbol: (turn) => (turn ? '🍏' : '🍊'), // get symbol for cross/circle
  getCssClass: (turn) => (turn ? 'cross' : 'circle'),
};

changeTurn = () => {
  state.turn = !state.turn;
  turnSpan.textContent = state.getSymbol(state.turn);
};

turnSpan.textContent = state.getSymbol(state.turn);

for (const cell of cells) {
  cell.addEventListener('click', (e) => {
    if (!e.target.textContent) {
      e.target.classList.add(state.getCssClass(state.turn));
      e.target.textContent = state.getSymbol(state.turn);
      changeTurn();
    }
  });
}

resetBtn.addEventListener('click', () => {
  for (const cell of cells) {
    cell.textContent = '';
    cell.classList.remove(state.getCssClass(true)); // Remove 'cross'
    cell.classList.remove(state.getCssClass(false)); // Remove 'circle'
  }
  // Reset turn to cross (true)
  state.turn = true;
  turnSpan.textContent = state.getSymbol(true);
});
