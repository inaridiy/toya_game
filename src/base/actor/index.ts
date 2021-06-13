import { Circle } from '../shape/circle';
import { EventDispatcher, GameEvent } from '../event/event-dispatcher';

export class Actor extends Circle {
  e: EventDispatcher;
  constructor(
    x: number,
    y: number,
    radius: number,
    public tags: string[] = []
  ) {
    super(x, y, radius);
    this.e = new EventDispatcher();
  }
  spawnActor(actor: Actor) {
    this.e.dispatchEvent('spawnactor', new GameEvent(actor));
  }

  destroy() {
    this.e.dispatchEvent('destroy', new GameEvent(this));
  }
}

export class SpriteActor extends Actor {
  public height: number;
  constructor(
    x: number,
    y: number,
    radius: number,
    tags: string[] = [],
    public sprite: HTMLImageElement,
    public width: number
  ) {
    super(x, y, radius, tags);
    this.height = (width / sprite.width) * sprite.height;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.sprite,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
