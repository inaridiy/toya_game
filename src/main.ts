import { Player } from './game/player';
import { Scene } from './base/game/scene';
import { AssetManager } from './base/assets/asset-loader';
import { Sprite } from './base/assets/sprite';
import { Rectangle } from './base/actor/shape';
import { InputReceiver } from './base/event/input';
import { GameInfo } from './base/event/event-dispatcher';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
class TestScene extends Scene {}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 10;

const assets = new AssetManager();
assets.addImage('ago', '/static/img/生首.png');
assets.loadAll().then(() => {
  console.log('image loaded');
  const testScene = new TestScene(ctx);

  const playerImg = assets.get('ago');
  const sprite = new Sprite(
    playerImg,
    new Rectangle(0, 0, playerImg.width, playerImg.height)
  );
  const player = new Player(50, 50, { main: sprite }, 10);
  testScene.add(player);

  const info = new GameInfo();

  const inputReceiver = new InputReceiver();
  console.log(testScene);
  const loop = () => {
    testScene.update(info, inputReceiver.getInput());
    window.requestAnimationFrame(loop);
  };
  loop();
});
