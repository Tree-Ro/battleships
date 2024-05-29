import Player from './player.js';

test('player object contains a personal gameboard', () => {
  const p1 = new Player();
  const p2 = new Player();

  const p1Cell = p1.gameboard.recieveAttack([2, 3]);
  let p2Cell = p2.gameboard.state()[2][3];
  expect(p1Cell.isHit).toBe(true);
  expect(p2Cell.isHit).toBe(false);

  p2Cell = p2.gameboard.recieveAttack([2, 3]);
  expect(p2Cell.isHit).toBe(true);
});

test.todo('places newSetOfShips correctly');
