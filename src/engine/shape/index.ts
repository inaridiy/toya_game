export type Shapes = Circle | Line | Rect | None;

export class Coord {
  constructor(public x: number, public y: number) {}
  public getDistance(other: Coord): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }
}

export class Circle extends Coord {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  type: 'circle' = 'circle';
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
}

export class None extends Coord {
  type: 'none' = 'none';
}
