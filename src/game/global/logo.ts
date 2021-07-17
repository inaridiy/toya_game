import { Actor } from '../../engine/actor';
import { updateObj } from '../../engine/game/scene';
import { None } from '../../engine/shape';

export class Logo extends Actor {
  constructor(x: number, y: number) {
    super(x, y, new None(0, 0));
  }
  timeCount = 0;
  update() {}
}
