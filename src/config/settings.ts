export const settings = {
  symbol: {
    cross: '🍏',
    circle: '🍊',
  },
  css: {
    cross: 'cross',
    circle: 'circle',
  },
  boardSize: 3,
  victoryCss: 'victory',

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
