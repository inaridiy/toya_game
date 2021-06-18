import { Coordinate, Shapes } from '.';
import { hitChecker } from '../hit-check/hitcheck';

export class Circle extends Coordinate {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  hitCheck(shape: Shapes): boolean {
    return hitChecker(this, shape);
  }
}
