import { stageRect } from '../../const';
import { Scene, updateObj } from '../../engine/game/scene';
import { Player } from '../actor/player';
import { ui } from '../../const';
import { AssetManager } from '../../engine/asset';

type uiConf = {
  x: number;
  y: number;
  text: string;
  font: string;
  fillStyle: string;
};

export class Stage extends Scene {
  constructor(bgImage: HTMLImageElement, public assets: AssetManager) {
    super();

    const drawFrame = ({ ctx }: updateObj) => {
      this.drawFrame(ctx, bgImage);
      this.drawAllInfo(ctx);
      this.clip(ctx);
    };
    this.beforeFuncs.push(drawFrame);
  }

  public stageRect = stageRect;
  public debug = false;

  drawFrame(ctx: CanvasRenderingContext2D, bgImage: HTMLImageElement): void {
    ctx.beginPath();
    ctx.drawImage(bgImage, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.clearRect(
      this.stageRect.lx,
      this.stageRect.ty,
      this.stageRect.width,
      this.stageRect.height
    );
  }
  drawAllInfo(ctx: CanvasRenderingContext2D): void {
    const [player] = this.get('player');
    const { power, life, bomb } = player as Player;
    const {
      info: { power: confPower, life: confLife, bomb: confBomb },
    } = ui;
    this.drawInfo(ctx, confPower, power);
    this.drawInfo(ctx, confLife, life);
    this.drawInfo(ctx, confBomb, bomb);
  }

  drawInfo(
    ctx: CanvasRenderingContext2D,
    conf: uiConf,
    data: { name: string; width: number; rotate: number } | number | string
  ): void {}

  drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number
  ): void {
    ctx.save();
    ctx.shadowBlur = 5;
    ctx.shadowColor = ctx.fillStyle as string;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  clip(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.rect(
      this.stageRect.lx,
      this.stageRect.ty,
      this.stageRect.width,
      this.stageRect.height
    );
    ctx.clip();
    //console.log(this.stageRect.by);
  }
}
