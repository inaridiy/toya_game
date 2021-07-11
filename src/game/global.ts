import { SpriteActor } from '../engine/actor';
import { updateObj } from '../engine/game/scene';
import { None } from '../engine/shape';

export class Logo extends SpriteActor {
  constructor(x: number, y: number) {
    super(x, y, new None(0, 0));
  }
  timeCount = 0;
  update({ ctx }: updateObj) {
    this.render(ctx);
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.font = '40px sans-serif';
  }
}
