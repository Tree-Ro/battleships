import './style.css';
import { renderGameboard } from './dom.js';

(() => {
  const startGameButton = document.querySelector('#introduction button');
  startGameButton.addEventListener('click', renderGameboard);
})();
