import { Circle } from './circle';
import { Rectangle } from './rectangle';
export interface ICoordinate {
  x: number;
  y: number;
}

export class Coordinate implements ICoordinate {
  constructor(public x: number, public y: number) {}
  public get getCoordinate(): ICoordinate {
    return { x: this.x, y: this.y };
  }
  public getDistance(other: ICoordinate): number {
    return Math.sqrt(
      Math.abs(other.x - this.x) ** 2 + Math.abs(other.y - this.y) ** 2
    );
  }
}

export type Shapes = Circle | Rectangle;
