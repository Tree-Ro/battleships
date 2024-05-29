import Player from './game/playerModules/player.js';

const player = new Player();
const npc = new Player();

function renderGameboard() {
  const playerBoard = createPlayerBoard(player);
  const npcBoard = createNPCBoard(npc);
  const container = document.querySelector('#board-container');

  while (container.children.length) {
    container.removeChild(container.children[0]);
  }

  container.append(playerBoard);
  container.append(npcBoard);
}

function createPlayerBoard() {
  const gameboard = player.gameboard.state();
  const boardWrapper = document.createElement('div');
  boardWrapper.id = 'player';
  boardWrapper.classList = `gameboard`;

  for (let x = 0; x < 10; x++) {
    const rowWrapper = document.createElement('div');
    rowWrapper.id = 'row';
    boardWrapper.append(rowWrapper);

    for (let y = 0; y < 10; y++) {
      const cell = gameboard[x][y];
      const divCell = document.createElement('div');

      divCell.classList.add('water');

      if (cell.isHit && cell.isShip) {
        divCell.classList.add('hit');
      } else {
        if (cell.isHit) divCell.classList.add('miss');
        if (cell.isShip) divCell.classList.add('ship');
      }

      rowWrapper.append(divCell);
    }
  }
  return boardWrapper;
}

function createNPCBoard() {
  const gameboard = npc.gameboard.state();

  const boardWrapper = document.createElement('div');
  boardWrapper.id = `npc`;
  boardWrapper.classList = `gameboard`;

  for (let x = 0; x < 10; x++) {
    const rowWrapper = document.createElement('div');
    rowWrapper.id = 'row';
    boardWrapper.append(rowWrapper);

    for (let y = 0; y < 10; y++) {
      const divCell = document.createElement('div');

      divCell.classList.add('undiscovered');

      divCell.addEventListener('click', (event) => {
        npc.gameboard.recieveAttack([x, y]);
        renderCellDiscovery(event.target, x, y);
      });

      rowWrapper.append(divCell);
    }
  }
  return boardWrapper;
}

function renderCellDiscovery(divCell, x, y) {
  const typeOfGameboard =
    divCell.parentNode.parentNode.id === 'player' ? player : npc;
  const gameboard = typeOfGameboard.gameboard.state();

  const cell = gameboard[x][y];
  if (cell.isHit && cell.isShip) {
    divCell.classList.remove('undiscovered');
    divCell.classList.add('hit');
  } else if (cell.isHit) {
    {
      divCell.classList.remove('undiscovered');
      divCell.classList.add('water');
      divCell.classList.add('miss');
    }
  }
}

export { createPlayerBoard, createNPCBoard, renderGameboard };
