import { assets } from '../../../assets';
import { typeSprite } from '../../../const';
import { SpriteActor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { updateObj } from '../../../engine/game/scene';
import { Coord, Shapes } from '../../../engine/shape';
import { Vec2 } from '../../../engine/shape/vector';

export class simplebullet extends SpriteActor {
  constructor(
    coord: Coord,
    hitBox: Shapes,
    public spriteData: typeSprite,
    public vec: Vec2,
    public speed?: number
  ) {
    super(coord.x, coord.y, hitBox, ['enemyBullet']);
    this.sprite = assets.sprite(spriteData.name);
  }
  sprite: Sprite;
  count = 0;
  update({ ctx }: updateObj): void {
    this.count++;

    const speedVec = this.speed
      ? this.vec.normalized.times(this.speed)
      : this.vec;
    this.x += speedVec.x;
    this.y += speedVec.y;

    this.render(ctx);
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(
      ctx,
      this.sprite,
      this.spriteData.width,
      this.spriteData.rotate
    );
  }
}
