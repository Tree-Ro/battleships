import Ship from '../shipModules/ship.js';

function createGameboard(size = 10) {
  let gameboard = generateBoard(size);

  function generateBoard(size) {
    let board = [];

    for (let x = 0; x < size; x++) {
      board[x] = [];
      for (let y = 0; y < size; y++) {
        let cellData = {
          hit: false,
          isShip: false,
          shipInstance: null,
        };
        board[x].push(cellData);
      }
    }
    return board;
  }

  function placeShip(startCords, endCords, shipInstance = Ship(4)) {
    if (!validateShipPlacement(startCords, endCords)) return null;

    let [x1, y1] = startCords;
    let [x2, y2] = endCords;
    const coordinateDelta = [x1 - x2, y1 - y2];

    let length = +coordinateDelta.filter(Boolean);
    length += Math.sign(length); //Increases delta by 1
    let xOrientedShip = coordinateDelta[0] ? true : false;
    for (let i = length; i !== 0; i -= Math.sign(i)) {
      gameboard[x1][y1].isShip = true;
      gameboard[x1][y1].shipInstance = shipInstance;

      if (xOrientedShip) {
        x1++;
      } else {
        y1++;
      }
    }

    return gameboard;
  }
  function validateShipPlacement(startCords, endCords) {
    let [x1, y1] = startCords;
    let [x2, y2] = endCords;
    const coordinateDelta = [x1 - x2, y1 - y2];

    let values = coordinateDelta.filter(Boolean);

    //Diagonal placement or length of 0
    if (values.length !== 1) return null;

    //Out of bounds placement
    let invalidCords = [x1, y1, x2, y2].filter((coordinate) => {
      return coordinate > size - 1 || coordinate < 0;
    });
    if (invalidCords.length) return null;

    //Placement overlaps with existing ship
    let length = +coordinateDelta.filter(Boolean);
    length += Math.sign(length); //Increases delta by 1
    let xOrientedShip = coordinateDelta[0] ? true : false;
    for (let i = length; i !== 0; i -= Math.sign(i)) {
      if (gameboard[x1][y1].isShip) return null;
      if (xOrientedShip) {
        x1++;
      } else {
        y1++;
      }
    }

    return true;
  }

  function recieveAttack() {}

  function allShipsSunken() {}

  return { placeShip, recieveAttack, allShipsSunken };
}

export default createGameboard;
