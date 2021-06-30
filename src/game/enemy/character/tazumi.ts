import { Enemy } from '.';
import { Rectangle } from '../../../base/actor/shape';

export class Tazumi extends Enemy {
  constructor(x: number, y: number) {
    super(x, y, new Rectangle(x, y, 50, 50));
  }
}
