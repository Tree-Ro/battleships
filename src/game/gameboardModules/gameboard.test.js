import createGameboard from './gameboard.js';

test('places ships at specific coordinates correctly', () => {
  const myGameboard = createGameboard();

  myGameboard.placeShip([0, 0], [2, 0]);
  let current = myGameboard.state();

  expect(current[0][0].isShip).toBe(true);
  expect(current[1][0].isShip).toBe(true);
  expect(current[2][0].isShip).toBe(true);
});

test('invalidates illegal ship placements', () => {
  const myGameboard = createGameboard();

  const diagonalPlacement = myGameboard.placeShip([0, 0], [1, 1]);
  const outofBounds = myGameboard.placeShip([0, 0], [-1, 0]);
  const noSize = myGameboard.placeShip([5, 3], [5, 3]);

  myGameboard.placeShip([2, 3], [5, 3]);
  const overlappingPlacement = myGameboard.placeShip([2, 3], [6, 3]);

  expect(diagonalPlacement).toBeNull();
  expect(outofBounds).toBeNull();
  expect(noSize).toBeNull();
  expect(overlappingPlacement).toBeNull();
});

test('recieves attacks correctly', () => {
  const myGameboard = createGameboard();

  myGameboard.placeShip([2, 3], [5, 3]);
  expect(myGameboard.state()[2][3].isHit).toBe(false);

  myGameboard.recieveAttack([2, 3]);
  expect(myGameboard.state()[2][3].isHit).toBe(true);

  const result1 = myGameboard.recieveAttack([2, 3]); //Duplicate
  const result2 = myGameboard.recieveAttack([44, -1]);
  expect(result1).toBeNull();
  expect(result2).toBeNull();

  let ship = myGameboard.recieveAttack([3, 3]).shipInstance;
  expect(ship.isSunk()).toBe(false);

  myGameboard.recieveAttack([4, 3]);
  myGameboard.recieveAttack([5, 3]);
  expect(ship.isSunk()).toBe(true);
});

test('keeps track of missed attacks', () => {
  const myGameboard = createGameboard();

  const cell = myGameboard.recieveAttack([3, 3]);
  const attackHitAShip = cell.isHit && cell.isShip;

  expect(attackHitAShip).toBe(false);
});

test('reports when all ships have been sunk', () => {
  const myGameboard = createGameboard();

  expect(myGameboard.allShipsSunken()).toBe(true);

  myGameboard.placeShip([2, 2], [3, 2]); //length of 2
  expect(myGameboard.allShipsSunken()).toBe(false);

  myGameboard.recieveAttack([2, 2]);
  myGameboard.recieveAttack([3, 2]);
  expect(myGameboard.allShipsSunken()).toBe(true);

  myGameboard.placeShip([3, 5], [3, 7]);
  expect(myGameboard.allShipsSunken()).toBe(false);
});
