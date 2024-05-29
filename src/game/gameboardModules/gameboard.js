import Ship from '../shipModules/ship.js';

function createGameboard(size = 10) {
  let gameboard = generateBoard(size);
  let ships = [];

  function state() {
    return gameboard;
  }

  function generateBoard(size) {
    let board = [];

    for (let x = 0; x < size; x++) {
      board[x] = [];
      for (let y = 0; y < size; y++) {
        let cellData = {
          isHit: false,
          isShip: false,
          shipInstance: null,
        };
        board[x].push(cellData);
      }
    }
    return board;
  }

  function addNewSetOfShips() {
    for (const shiplength of [5, 4, 3, 3, 2]) {
      const i = shiplength;

      if (Math.random() > 0.5) {
        //X-oriented Ship
        while (true) {
          let xVal = Math.round(Math.random() * 10) - 1;
          let yVal = Math.round(Math.random() * 10) - 1;
          while (yVal + i > 9) {
            yVal--;
          }
          let startCords = [xVal, yVal];
          let endCords = [xVal, yVal + i];

          if (validateShipPlacement(startCords, endCords)) {
            placeShip(startCords, endCords);
            break;
          }
          continue;
        }
      } else {
        //Y Oriented Ship
        while (true) {
          let xVal = Math.round(Math.random() * 10) - 1;
          let yVal = Math.round(Math.random() * 10) - 1;
          while (xVal + i > 9) {
            xVal--;
          }
          let startCords = [xVal, yVal];
          let endCords = [xVal + i, yVal];

          if (validateShipPlacement(startCords, endCords)) {
            placeShip(startCords, endCords);
            break;
          }
          continue;
        }
      }
    }
    return;
  }

  function placeShip(startCords, endCords) {
    if (!validateShipPlacement(startCords, endCords)) return null;

    let [x1, y1] = startCords;
    let [x2, y2] = endCords;
    const coordinateDelta = [x1 - x2, y1 - y2];

    let length = +coordinateDelta.filter(Boolean);
    length += Math.sign(length); //Increases delta by 1

    const shipInstance = Ship(Math.abs(length));
    ships.push(shipInstance);

    const xOrientedShip = coordinateDelta[0] ? true : false;
    for (let i = length; i !== 0; i -= Math.sign(i)) {
      gameboard[x1][y1].isShip = true;
      gameboard[x1][y1].shipInstance = shipInstance;

      if (xOrientedShip) {
        x1++;
      } else {
        y1++;
      }
    }

    return;
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

  function recieveAttack(cords) {
    if (!validateAttack(cords)) return null;
    const [x, y] = cords;
    const cell = gameboard[x][y];

    cell.isHit = true;
    if (cell.isShip) {
      cell.shipInstance.hit();
    }

    return cell;
  }
  function validateAttack(cords) {
    const [x, y] = cords;

    //Out of bounds attack
    let invalidCords = [x, y].filter((coordinate) => {
      return coordinate > size - 1 || coordinate < 0;
    });
    if (invalidCords.length) return null;

    const cell = gameboard[x][y];
    //Cell already been attacked
    if (cell.isHit) return null;

    return true;
  }

  function allShipsSunken() {
    const sunkenShips = ships.filter((ship) => {
      if (ship.isSunk()) return ship;
    });

    return sunkenShips.length === ships.length;
  }

  return { state, recieveAttack, allShipsSunken, addNewSetOfShips };
}

export default createGameboard;
