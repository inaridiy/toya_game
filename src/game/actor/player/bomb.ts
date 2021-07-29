import { assets } from '../../../assets';
import { stageRect, playerConf } from '../../../const';
import { drawSprite, Sprite } from '../../../engine/asset';
import { updateObj } from '../../../engine/game/scene';
import { PlayerBullet } from './player-bullet';

const { bombA } = playerConf;

export class BombA extends PlayerBullet {
  constructor() {
    super(
      stageRect.x,
      stageRect.y,
      stageRect.clone(),
      bombA.damage,
      assets.sprite('masp')
    );
  }
  public duration = bombA.duration;

  update({ ctx }: updateObj): void {
    this.duration--;
    this.render(ctx);
    console.log('rendert');
    if (this.duration === 0) {
      this.destroy();
    }
  }
  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    drawSprite(ctx, this.x, this.y, this.sprite);

    ctx.restore();
  }
}
