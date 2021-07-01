import { SpriteActor } from '../../../base/actor';
import { Shapes } from '../../../base/actor/shape';
import { Sprite } from '../../../base/assets/sprite';
import { GameInfo } from '../../../base/event/event-dispatcher';
import { Vec2 } from '../../../base/vector/vec';

export class NormalBullet extends SpriteActor {
  constructor(
    x: number,
    y: number,
    public velocityVec: Vec2,
    hitBox: Shapes,
    public sprite: Sprite,
    public width: number,
    public slope: number,
    tags: string[]
  ) {
    super(x, y, hitBox, ['enemyBullet', ...tags]);
  }
  update(info: GameInfo): void {
    this.x += this.velocityVec.x;
    this.y += this.velocityVec.y;
    if (!info.screenRect.isInside(this.coord)) {
      this.destroy();
    }
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(
      ctx,
      this.sprite,
      this.width,
      (Math.atan2(this.velocityVec.y, this.velocityVec.x) * 180) / Math.PI +
        this.slope
    );
  }
}
