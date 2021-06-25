import { Player } from './game/player';
import { Scene } from './base/game/scene';
import { AssetManager } from './base/assets/asset-loader';
import { Sprite } from './base/assets/sprite';
import { Rectangle } from './base/actor/shape';
import { Game } from './base/game/game';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
class TestScene extends Scene {}

const assets = new AssetManager();
assets.addImage('ago', '/static/img/生首.png');
assets
  .loadAll()
  .then(() => {
    console.log('image loaded');
    const testScene = new TestScene();

    const playerImg = assets.get('ago');
    const sprite = new Sprite(
      playerImg,
      new Rectangle(0, 0, playerImg.width, playerImg.height)
    );
    const player = new Player(50, 50, { main: sprite }, 10);
    testScene.add(player);

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
