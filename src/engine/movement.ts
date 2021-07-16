import { Bezier } from './shape/bezier';
import { Coord } from './shape';

export type speedFunc = (t: number) => number;
export type moveSpeed = speedFunc | number;

class EaseIn extends Bezier {
  constructor(public c1: Coord, public c2: Coord) {
    super(new Coord(0, 0), c1, c2, new Coord(1, 1));
  }
}
