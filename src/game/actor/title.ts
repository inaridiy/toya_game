import { assets } from '../../assets';
import { screenRect } from '../../const';
import { SpriteActor } from '../../engine/actor';
import { Sprite } from '../../engine/asset';
import { updateObj } from '../../engine/game/scene';
import { None, Rect } from '../../engine/shape';
import { Vec2 } from '../../engine/shape/vector';

export class RotatingKenmoti extends SpriteActor {
  constructor(x: number, y: number, public direction: Vec2) {
    super(x, y, new None(x, y), [], screenRect);
    this.sprite = assets.sprite('dasai');
  }

  sprite: Sprite;
  dgree = 0;
  angleIncr = 4;
  speed = 10;
  update({ ctx }: updateObj): void {
    if (!screenRect.isInside(this.coord)) {
      this.angleIncr *= -1;
    }
    if (this.x < screenRect.lx || this.x > screenRect.rx) {
      this.direction.x *= -1;
    }
    if (this.y < screenRect.ty || this.y > screenRect.by) {
      this.direction.y *= -1;
    }
    const speedVec = this.direction.normalized.times(this.speed);
    this.x += speedVec.x;
    this.y += speedVec.y;
    this.dgree += this.angleIncr;

    this.drawSprite(ctx, this.sprite, 200, this.dgree);
  }
}
