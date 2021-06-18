import { Coordinate } from '.';

export class Rectangle extends Coordinate {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number
  ) {
    super(x, y);
  }
}
