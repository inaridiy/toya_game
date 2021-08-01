import { SpriteActor } from '../../engine/actor';
import { Sprite } from '../../engine/asset';
import { updateObj } from '../../engine/game/scene';
import { Bezier } from '../../engine/shape/bezier';
import { Coord, Rect } from '../../engine/shape';
import { assets } from '../../assets';

export class BezierAcotr extends SpriteActor {
  constructor(x: number, y: number) {
    super(x, y, new Rect(x, y, 100, 20), ['enemy']);
    this.sprite = assets.sprite('ago');
  }
  public timeCount = 0;
  public sprite: Sprite;
  public bezier = new Bezier(
    this.coord,
    new Coord(this.coord.x + 100, this.coord.y + 100),
    new Coord(this.coord.x + 400, this.coord.y + 600),
    new Coord(this.coord.x + 500, this.coord.y)
  );
  update({ ctx, gameInfo }: updateObj): void {
    this.timeCount++;
    const l = 1 / 300;
    this.coord = this.bezier.getCoord(this.timeCount * l);
    this.drawSprite(ctx, this.sprite, 50);
    const lenght = 1 / 10;
    this.bezier.stroke(ctx);

    for (let i = 0; i <= 15; i++) {
      const p = this.bezier.getCoord(i * lenght);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, (0 * Math.PI) / 180, (360 * Math.PI) / 180, false);
      ctx.fillStyle = 'rgba(255,0,0,0.8)';
      ctx.fill();
      ctx.stroke();
    }
    if (!gameInfo.screenRect.isInside(this.coord)) {
      this.tags = [];
    }
  }
}
