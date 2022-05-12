export const settings = {
  // symbol text for rendering to board
  symbol: {
    cross: '🍏',
    circle: '🍊',
  },
  // css class names for symbols
  css: {
    cross: 'cross',
    circle: 'circle',
  },
  // css class name for victory highlight styling
  victoryCss: 'victory',

  boardSize: 3,

  // HELPER FUNCTIONS THAT RETURN DATA BASED ON SETTINGS
  getSymbol: (player: boolean) => {
    return player ? settings.symbol.cross : settings.symbol.circle;
  },
  getCssClass: (player: boolean) => {
    return player ? settings.css.cross : settings.css.circle;
  },
  getScoreText: (player: boolean, score: number) => {
    return `${settings.getSymbol(player)} : ${score}`;
  },
};

// update css to fit board size
const root = document.querySelector(':root')! as HTMLElement;
root.style.setProperty('--board-size', settings.boardSize.toString());
