import { SpriteActor } from '../../base/actor';
import { Circle } from '../../base/actor/shape';
import { Sprite } from '../../base/assets/sprite';
import { GameInfo } from '../../base/event/event-dispatcher';

export abstract class PlayerBullet extends SpriteActor {
  constructor(
    x: number,
    y: number,
    radius: number,
    public sprite: Sprite,
    public speed: number
  ) {
    super(x, y, new Circle(x, y, radius), ['playerBullet']);
  }
}

export class PlayerBulletA extends PlayerBullet {
  constructor(x: number, y: number, sprite: Sprite) {
    const sitRadius = 5;
    const speed = 50;

    super(x, y, sitRadius, sprite, speed);
  }
  update(gameInfo: GameInfo): void {
    this.y -= this.speed;
    if (!gameInfo.screenRect.isInside(this.coord)) {
      this.destroy();
    }
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprite, 8);
  }
}
