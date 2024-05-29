import createGameboard from '../gameboardModules/gameboard.js';

class Player {
  constructor() {
    this.gameboard = createGameboard();
  }
}

export default Player;
