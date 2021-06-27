import { AssetManager } from './base/assets/asset-loader';
import { Game } from './base/game/game';
import { Test } from './game/scenes/test';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');

const assets = new AssetManager('/static/img/');
assets.addImage('ago', '生首.png');
assets.addImage('yugamin', 'yugamin.png');
assets
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
