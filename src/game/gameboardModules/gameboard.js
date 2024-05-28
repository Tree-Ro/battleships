import Ship from '../shipModules/ship.js';

function createGameboard(size = 10) {
  let gameboard = [];

  function generateBoard(size) {
    let board = [];

    for (let x = 0; x < size; x++) {
      board[x] = [];
      for (let y = 0; y < size; y++) {
        const cellData = {
          hit: false,
          isShip: false,
        };
        board[x].push(cellData);
      }
    }
  }
  gameboard = generateBoard();

  function placeShip(startCords, endCords) {
    if (!validateShipPlacement(startCords, endCords)) return null;
  }

  function validateShipPlacement(startCords, endCords) {
    return true;
  }

  function recieveAttack() {}

  function allShipsSunken() {}

  return { placeShip, recieveAttack };
}

export default createGameboard;
