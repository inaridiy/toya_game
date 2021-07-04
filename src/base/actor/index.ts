import { EventDispatcher } from '../event/event-dispatcher';
import { Shapes } from './shape';
import { Coordinate } from './shape/coordinate';
import { Input } from '../event/input';
import { GameEvent, GameInfo } from '../event/event-dispatcher';
import { Sprite } from '../assets/sprite';
import { Scene } from '../game/scene';

export abstract class Actor extends EventDispatcher<Actor> {
  constructor(
    private _x: number,
    private _y: number,
    public hitBox: Shapes,
    public tags: string[] = []
  ) {
    super();
  }
  type: 'actor' = 'actor';
  abstract update(gameInfo: GameInfo, input: Input, scene: Scene): void;
  abstract render(ctx: CanvasRenderingContext2D): void;

  hasTag(tagName: string): boolean {
    return this.tags.includes(tagName);
  }
  spawnActor(actor: Actor): void {
    this.dispatchEvent('spawnactor', new GameEvent(actor));
  }

  destroy(): void {
    this.dispatchEvent('destroy', new GameEvent(this));
  }
  get x(): number {
    return this._x;
  }
  set x(n: number) {
    this._x = n;
    this.hitBox.x = n;
  }
  get y(): number {
    return this._y;
  }
  set y(n: number) {
    this._y = n;
    this.hitBox.y = n;
  }

  get coord(): Coordinate {
    return new Coordinate(this._x, this._y);
  }
}

export abstract class SpriteActor extends Actor {
  constructor(x: number, y: number, hitBox: Shapes, tags: string[] = []) {
    super(x, y, hitBox, tags);
  }

  drawSprite(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    width = sprite.rect.width,
    degree = 0
  ): void {
    if (sprite === undefined) {
      console.error('スプライトがありません');
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((degree * Math.PI) / 180);
    const height = (sprite.rect.height * width) / sprite.rect.width;
    ctx.drawImage(
      sprite.image,
      sprite.rect.x,
      sprite.rect.y,
      sprite.rect.width,
      sprite.rect.height,
      -width / 2,
      -height / 2,
      width,
      height
    );
    ctx.restore();
  }
}
