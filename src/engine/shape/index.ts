export type Shapes = Circle | Line | Rect | None;

export class Coord {
  constructor(public x: number, public y: number) {}
  public getDistance(other: Coord): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }
  public stroke(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'red';
    ctx.arc(
      this.x,
      this.y,
      2,
      (0 * Math.PI) / 180,
      (360 * Math.PI) / 180,
      false
    );
    ctx.globalAlpha = 1;
  }
}

export class Circle extends Coord {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  type: 'circle' = 'circle';
  public stroke(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      (0 * Math.PI) / 180,
      (360 * Math.PI) / 180,
      false
    );
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export class Line extends Coord {
  constructor(x: number, y: number, public length: number, degree: number) {
    super(x, y);
    this.halfOfLength = this.length / 2;
    this.angle = degree * (Math.PI / 180);
  }
  type: 'line' = 'line';
  angle: number;
  private halfOfLength: number;

  get startPoint(): Coord {
    const startX = this.x + this.halfOfLength * Math.cos(this.angle);
    const startY = this.y + this.halfOfLength * Math.sin(this.angle);
    return new Coord(startX, startY);
  }
  get endPoint(): Coord {
    const startX = this.x - this.halfOfLength * Math.cos(this.angle);
    const startY = this.y - this.halfOfLength * Math.sin(this.angle);
    return new Coord(startX, startY);
  }
  public stroke(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(this.startPoint.x, this.startPoint.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
}

export class Rect extends Coord {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }
  type: 'rect' = 'rect';

  isInside(c: Coord): boolean {
    return (
      c.x < this.x + this.width / 2 &&
      c.x > this.x - this.width / 2 &&
      c.y < this.y + this.height / 2 &&
      c.y > this.y - this.height / 2
    );
  }
  public stroke(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 0.5;

    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.rect(
      this.x + this.width / 2,
      this.y + this.height,
      this.x - this.width,
      this.y - this.height
    );
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

export class None extends Coord {
  type: 'none' = 'none';
  stroke() {
    return false;
  }
}
