import { Actor, TextSprite } from '../../engine/actor';
import { updateObj } from '../../engine/game/scene';
import { None } from '../../engine/shape';

export class Logo extends Actor {
  constructor(x: number, y: number) {
    super(x, y, new None(0, 0));
  }
  timeCount = 0;
  update() {
    this.spawnActor(new KenLogo(this.x, this.y + 75));
  }
}

export class KenLogo extends TextSprite {
  constructor(x: number, y: number) {
    super(x, y, new None(0, 0));
  }
  update({ ctx }: updateObj) {}
  render(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = '40px sans-serif';
  }
}
