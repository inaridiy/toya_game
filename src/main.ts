import { AssetManager } from './engine/asset';
import { Game } from './engine/game/game';
import { Test } from './game/scene/test';
import { playerImages } from './const';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const assets = new AssetManager('/static/img/');

assets
  .addImages(playerImages)
  .loadAll()
  .then(() => {
    const testScene = new Test(assets);
    const game = new Game(
      canvas,
      window.innerWidth,
      window.innerHeight - 10,
      testScene
    );
    game.start();
  })
  .catch((e) => {
    console.error(e);
  });
