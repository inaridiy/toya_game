import { EventDispatcher, GameEvent } from './game/event/event-dispatcher';
import { Shapes, Coord, Rect } from './shape';
import { Sprite, drawSprite } from './asset';

import { updateObj } from './game/scene';

export abstract class Actor extends EventDispatcher<Actor> {
  constructor(
    private _x: number,
    private _y: number,
    public hitBox: Shapes,
    public tags: string[] = [],
    centerRect?: Rect
  ) {
    super();
    this.x += centerRect?.x ?? 0;
    this.y += centerRect?.y ?? 0;
  }
  abstract update(obj: updateObj): void;
  // abstract render(ctx: CanvasRenderingContext2D): void;

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
  get coord(): Coord {
    return new Coord(this._x, this._y);
  }
  set coord(coord: Coord) {
    this.x = coord.x;
    this.y = coord.y;
  }
}

export abstract class SpriteActor extends Actor {
  constructor(
    x: number,
    y: number,
    hitBox: Shapes,
    tags: string[] = [],
    center?: Rect
  ) {
    super(x, y, hitBox, tags, center);
  }

  drawSprite(
    ctx: CanvasRenderingContext2D,
    sprite: Sprite,
    width = sprite.rect.width,
    degree = 0
  ): void {
    drawSprite(ctx, this.x, this.y, sprite, width, degree);
  }
}
