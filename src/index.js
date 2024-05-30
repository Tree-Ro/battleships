import './style.css';
import { displayWinModal, renderGameboard } from './dom.js';

(() => {
  const startGameButton = document.querySelector('#introduction button');
  startGameButton.addEventListener('click', renderGameboard);
  startGameButton.click();
})();
