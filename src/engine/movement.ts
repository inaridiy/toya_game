import { Coord } from './shape';

export type speedFunc = (t: number) => number;
export type moveSpeed = speedFunc | number;

export class Bezier {
  constructor(
    public start: Coord,
    public c1: Coord,
    public c2: Coord,
    public end: Coord
  ) {}

  stroke(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.bezierCurveTo(
      this.c1.x,
      this.c1.y,
      this.c2.x,
      this.c2.y,
      this.end.x,
      this.end.y
    );
    ctx.stroke();
  }
  getCoord(t: number): Coord {
    const pointX =
      t ** 3 * this.end.x +
      3 * t ** 2 * (1 - t) * this.c2.x +
      3 * t * (1 - t) ** 2 * this.c1.x +
      (1 - t) ** 3 * this.start.x;
    const pointY =
      t ** 3 * this.end.y +
      3 * t ** 2 * (1 - t) * this.c2.y +
      3 * t * (1 - t) ** 2 * this.c1.y +
      (1 - t) ** 3 * this.start.y;
    const coord = new Coord(pointX, pointY);

    return coord;
  }
}
