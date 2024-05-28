import { experiments } from 'webpack';
import createGameboard from './gameboard.js';

test('places ships at specific coordinates correctly', () => {
  let myGameboard = createGameboard();

  let currentState = myGameboard.placeShip([0, 0], [2, 0]);

  expect(currentState[0][0].isShip).toBe(true);
  expect(currentState[1][0].isShip).toBe(true);
  expect(currentState[2][0].isShip).toBe(true);
});

test('validates illegal ship placements', () => {
  let myGameboard = createGameboard();

  const diagonalPlacement = myGameboard.placeShip([0, 0], [1, 1]);
  const outofBounds = myGameboard.placeShip([0, 0], [-1, 0]);
  const noSize = myGameboard.placeShip([5, 3], [5, 3]);

  expect(diagonalPlacement).toBe(null);
  expect(outofBounds).toBe(null);
  expect(noSize).toBe(null);
});

test.todo('recieves attacks correctly');

test.todo('keeps track of missed attacks');

test.todo('reports when all ships have been sunk');
