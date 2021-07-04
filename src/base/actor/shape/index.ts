import { Coordinate } from './coordinate';
import { hitCheker } from '../hit-check';

export type ShapeTypes = 'circle' | 'line' | 'rectangle';
export type Shapes = Circle | Line | Rectangle | None;

export interface Shape extends Coordinate {
  readonly type: ShapeTypes;
  hitTest: (other: Shapes) => boolean;
}

export class None extends Coordinate {
  constructor() {
    super(0, 0);
  }
  type: 'none' = 'none';
  hitTest(other: Shapes): boolean {
    return hitCheker(this, other);
  }
}

export class Circle extends Coordinate implements Shape {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  type: 'circle' = 'circle';
  hitTest(other: Shapes): boolean {
    return hitCheker(this, other);
  }
}

export class Line extends Coordinate implements Shape {
  constructor(x: number, y: number, public length: number, degree: number) {
    super(x, y);
    this.halfOfLength = this.length / 2;
    this.angle = degree * (Math.PI / 180);
  }
  type: 'line' = 'line';
  angle: number;
  private halfOfLength: number;

  get startPoint(): Coordinate {
    const startX = this.x + this.halfOfLength * Math.cos(this.angle);
    const startY = this.y + this.halfOfLength * Math.sin(this.angle);
    return new Coordinate(startX, startY);
  }
  get endPoint(): Coordinate {
    const startX = this.x - this.halfOfLength * Math.cos(this.angle);
    const startY = this.y - this.halfOfLength * Math.sin(this.angle);
    return new Coordinate(startX, startY);
  }
  hitTest(other: Shapes): boolean {
    return hitCheker(this, other);
  }
}

export class Rectangle extends Coordinate implements Shape {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }
  type: 'rectangle' = 'rectangle';

  isInside(ci: Coordinate): boolean {
    return (
      ci.x < this.x + this.width / 2 &&
      ci.x > this.x - this.width / 2 &&
      ci.y < this.y + this.height / 2 &&
      ci.y > this.y - this.height / 2
    );
  }
  hitTest(other: Shapes): boolean {
    return hitCheker(this, other);
  }
}
