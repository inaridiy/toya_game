import { IShapes, Coordinate } from './shape';

export class Circle extends Coordinate implements IShapes {
  constructor(x: number, y: number, public radius: number) {
    super(x, y);
  }
  public type = 'circle';
  hitCheck(shape: IShapes) {
    switch (shape.type) {
      case 'circle':
        break;
      case 'rectangle':
        break;
    }
    return true;
  }
}
