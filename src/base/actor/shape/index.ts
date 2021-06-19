import { Coordinate } from './coordinate';
export type ShapeTypes = 'circle' | 'line' | 'rectangle';
export type Shapes = Circle | Line | Rectangle;

export interface Shape extends Coordinate {
  readonly type: ShapeTypes;
  hitTest: (other: Shapes) => boolean;
}

export class Circle extends Coordinate implements Shape {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  type: 'circle' = 'circle';
  hitTest(other: Shapes) {
    return true;
  }
}

export class Line extends Coordinate implements Shape {
  constructor(x: number, y: number, public length: number) {
    super(x, y);
  }
  type: 'line' = 'line';
  hitTest(other: Shapes) {
    return true;
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
  hitTest(other: Shapes) {
    return true;
  }
}
