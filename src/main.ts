import { Game } from './engine/game/game';
import { Test } from './game/scene/test';
import { size } from './const';
import { loadAssets } from './assets';
import { First } from './game/scene/first';
import { FirstStage } from './game/stage/firstStage';

const wrapper = document.getElementById('wrapper') as HTMLDivElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const init = () => {
  loadAssets()
    .then(gameInit)
    .catch((e) => console.error(e));
};

const gameInit = () => {
  setCanvasSize();
  const testScene = new First();
  const game = new Game(canvas, size.x, size.y, testScene);
  game.start();
};

const setCanvasSize = () => {
  if (wrapper.offsetWidth * size.y > wrapper.offsetHeight * size.x) {
    canvas.style.height = wrapper.offsetHeight.toString() + 'px';
    canvas.style.width = 'auto';
  } else {
    canvas.style.width = wrapper.offsetWidth.toString() + 'px';
    canvas.style.height = 'auto';
  }
};

window.onload = init;
window.onresize = setCanvasSize;
