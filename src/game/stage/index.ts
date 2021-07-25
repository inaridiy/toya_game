import { stageRect } from '../../const';
import { Scene, updateObj } from '../../engine/game/scene';
import { Player } from '../actor/player';

export class Stage extends Scene {
  constructor(bgImage: HTMLImageElement) {
    super();

    const drawFrame = ({ ctx }: updateObj) => {
      this.drawFrame(ctx, bgImage);
      this.drawInfo(ctx);
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
  drawInfo(ctx: CanvasRenderingContext2D): void {
    const [player] = this.get('player');
    const { power, life, bomb } = player as Player;
    ctx.font = '100px OtomanopeeOne';
    ctx.fillStyle = 'black';
    ctx.fillText('剣持ボイス出せ', 200, 600);
  }
  drawText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number
  ): void {}
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
