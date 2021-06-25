import { InputReceiver } from '../event/input';
import { Scene } from '../game/scene';
import { Rectangle } from '../actor/shape';
import { GameInfo } from '../event/event-dispatcher';

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

    this.screenRect = new Rectangle(width / 2, height / 2, width, height);
  }
  public ctx: CanvasRenderingContext2D;
  public currentScene: Scene;
  public screenRect: Rectangle;

  private _inputReceiver = new InputReceiver();

  changeScene(newScene: Scene): void {
    this.currentScene = newScene;
    this.currentScene.addEventListener('changescene', (e) =>
      this.changeScene(e.target as Scene)
    );
  }

  start(): void {
    window.requestAnimationFrame(this.loop.bind(this));
  }

  loop(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const info = new GameInfo(this.screenRect, this.currentScene);
    const input = this._inputReceiver.getInput();
    this.currentScene.update(info, input, this.ctx);
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
