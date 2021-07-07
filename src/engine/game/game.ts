import { Scene } from './scene';
import { Rect } from '../shape';
import { InputReceiver } from './event/input';
import { GameInfo } from './info';

export class Game {
  constructor(
    public canvas: HTMLCanvasElement,
    public width: number,
    public height: number,
    firstScene: Scene
  ) {
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = width;
    this.canvas.height = height;

    this.currentScene = firstScene;
    this.changeScene(firstScene);

    this.screenRect = new Rect(width / 2, height / 2, width, height);
  }
  public ctx: CanvasRenderingContext2D;
  public currentScene: Scene;
  public screenRect: Rect;

  private _count = 0;
  private _inputReceiver = new InputReceiver();

  changeScene(newScene: Scene): void {
    this.currentScene = newScene;
    this.currentScene.addEventListener('changescene', (e) => {
      this.changeScene(e.target);
    });
  }

  start(): void {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop(): void {
    this._count++;
    this.ctx.clearRect(0, 0, this.width, this.height);
    const info = new GameInfo(this.screenRect, this.currentScene, this._count);
    const input = this._inputReceiver.getInput();
    this.currentScene.update(info, input, this.ctx);
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
