import Player from './game/playerModules/player.js';

const player = new Player();
const npc = new Player();
let isPlayerTurn = true;

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
  player.gameboard.addNewSetOfShips();
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
  npc.gameboard.addNewSetOfShips();

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
        if (isPlayerTurn) {
          npc.gameboard.recieveAttack([x, y]);
          renderCellDiscovery(event.target, x, y);

          isPlayerTurn = false;
        }

        setTimeout(() => {
          const [x1, y1] = player.gameboard.getShotByNPC();
          const divCell =
            document.querySelector(`#player`).children[x1].children[y1];
          console.log(divCell);
          renderCellDiscovery(divCell, x1, y1);
          isPlayerTurn = true;
        }, 0);

        if (
          npc.gameboard.allShipsSunken() ||
          player.gameboard.allShipsSunken()
        ) {
          const result = confirm(`${
            player.gameboard.allShipsSunken()
              ? 'Your ships got sunk first :('
              : 'You sank all enemy ships!'
          }
            Do you want to play another game?`);
          result === true ? renderGameboard() : location.reload();
        }
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
    divCell.id = 'hit';
  } else if (cell.isHit) {
    {
      divCell.classList.remove('undiscovered');
      divCell.classList.add('water');
      divCell.classList.add('miss');
    }
  }
}

export { createPlayerBoard, createNPCBoard, renderGameboard };
