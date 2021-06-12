import { IShapes, Coordinate } from './shape';

export class Rectangle extends Coordinate implements IShapes {
  constructor(
    x: number,
    y: number,
    public width: number,
    public height: number,
    public angle: number
  ) {
    super(x, y);
  }
  public type = 'rectangle';
}
