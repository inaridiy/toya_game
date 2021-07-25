import { stageRect } from '../../const';
import { Scene, updateObj } from './scene';

export class Stage extends Scene {
  constructor(bgImage: HTMLImageElement) {
    super();

    const drawFrame = ({ ctx }: updateObj) => {
      this.drawFrame(ctx, bgImage);
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
