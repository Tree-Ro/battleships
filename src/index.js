import './style.css';
import Player from './game/playerModules/player.js';
import createGameboard from './game/gameboardModules/gameboard.js';
import { createPlayerBoard, createNPCBoard, renderGameboard } from './dom.js';

(() => {
  const startGameButton = document.querySelector('#introduction button');
  startGameButton.addEventListener('click', renderGameboard);
  startGameButton.click();
})();
