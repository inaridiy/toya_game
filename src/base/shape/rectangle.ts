import { Coordinate } from '.';

export class Rectangle extends Coordinate {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number,
    public angle: number
  ) {
    super(x, y);
  }
}
