import { AssetManager } from './engine/asset';
import { Game } from './engine/game/game';
import { Test } from './game/scene/test';
import { playerImages, font, size } from './const';

const wrapper = document.getElementById('wrapper') as HTMLDivElement;
const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const assets = new AssetManager('/static/img/');

const init = () => {
  const initPromise = Promise.all([loadAssets(), loadFonts()]);

  initPromise.then(gameInit).catch((e) => console.error(e));
};

const gameInit = () => {
  setCanvasSize();
  const testScene = new Test(assets);
  const game = new Game(canvas, size.x, size.y, testScene);
  game.start();
};

const loadFonts = () => {
  const fontPromises = font.fonts.map((fontData) => {
    const obj = new FontFace(
      fontData.family,
      `url('${font.fontPath}${fontData.source}')`
    );
    return new Promise((resolve, reject) => {
      obj
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
          resolve('ok');
        })
        .catch((e) => reject(e));
    });
  });
  return Promise.all(fontPromises);
};

const loadAssets = () => {
  return assets
    .addImages(playerImages)
    .addImage('bgImg', 'bg.jpg')
    .addImage('kimoi', 'kimoi.png')
    .addImage('power', 'power.png')
    .loadAll();
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
