import { Vec2 } from '../vector';
import { toDeg, toRad } from './const';

export type Shapes = Circle | Line | Rect | None;

export class Coord extends Vec2 {
  constructor(x: number, y: number) {
    super(x, y);
  }

  public getDistance(other: Coord): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }
}

export class Circle extends Coord {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  type: 'circle' = 'circle';
  isInside(c: Coord): boolean {
    return this.getDistance(c) < this.radius;
  }
  cloneShape(): Circle {
    return new Circle(this.x, this.y, this.radius);
  }
}

export class Line extends Coord {
  constructor(x: number, y: number, public length: number, degree: number) {
    super(x, y);
    this.halfOfLength = this.length / 2;
    this.slope = degree * toRad;
  }
  type: 'line' = 'line';
  slope: number;
  private halfOfLength: number;

  isInside(c: Coord): boolean {
    const v1 = Vec2.fromToVec(this.startPoint, c);
    const v2 = Vec2.fromToVec(this.startPoint, this.endPoint);
    return Vec2.cross(v1, v2) === 0;
  }

  cloneShape(): Line {
    return new Line(this.x, this.y, this.length, this.slope * toDeg);
  }

  get startPoint(): Coord {
    const startX = this.x + this.halfOfLength * Math.cos(this.slope);
    const startY = this.y + this.halfOfLength * Math.sin(this.slope);
    return new Coord(startX, startY);
  }
  get endPoint(): Coord {
    const endX = this.x - this.halfOfLength * Math.cos(this.slope);
    const endY = this.y - this.halfOfLength * Math.sin(this.slope);
    return new Coord(endX, endY);
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
  static upperLeft(x: number, y: number, width: number, height: number): Rect {
    const centerX = x + width / 2,
      centerY = y + height / 2;
    return new Rect(centerX, centerY, width, height);
  }

  isInside(c: Coord): boolean {
    return c.x < this.rx && c.x > this.lx && c.y < this.by && c.y > this.ty;
  }
  expansion(x: number, y?: number): Rect {
    return new Rect(this.x, this.y, this.width + x, this.height + (y || x));
  }
  cloneShape(): Rect {
    return new Rect(this.x, this.y, this.width, this.height);
  }
  get lx(): number {
    return this.x - this.width / 2;
  }
  get rx(): number {
    return this.x + this.width / 2;
  }
  get by(): number {
    return this.y + this.height / 2;
  }
  get ty(): number {
    return this.y - this.height / 2;
  }
}

export class None extends Coord {
  type: 'none' = 'none';
}
