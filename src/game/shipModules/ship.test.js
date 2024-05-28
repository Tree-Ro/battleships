import Ship from './ship.js';

test('ship correctly returns sunk status', () => {
  const myShip = Ship(5); //Lengfth of 5

  for (let i = 0; i < 4; i++) myShip.hit();

  expect(myShip.isSunk()).toBe(false);

  myShip.hit();

  expect(myShip.isSunk()).toBe(true);
});
