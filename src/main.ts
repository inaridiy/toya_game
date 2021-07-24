import { AssetManager } from './engine/asset';
import { Game } from './engine/game/game';
import { Test } from './game/scene/test';
import { playerImages, size } from './const';

const wrapper = document.getElementById('wrapper') as HTMLDivElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const assets = new AssetManager('/static/img/');

const init = () => {
  setCanvasSize();
  const testScene = new Test(assets);
  const game = new Game(canvas, size.x, size.y, testScene);
  game.start();
};

const loadAssets = () => {
  assets
    .addImages(playerImages)
    .loadAll()
    .then(init)
    .catch((e) => {
      console.error(e);
    });
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
window.onload = loadAssets;
window.onresize = setCanvasSize;
