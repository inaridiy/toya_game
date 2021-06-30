import { SpriteActor } from '../../../base/actor';
import { Sprite } from '../../../base/assets/sprite';
import { Shapes } from '../../../base/actor/shape';

export abstract class Enemy extends SpriteActor {
  constructor(x: number, y: number, hitBox: Shapes) {
    super(x, y, hitBox, ['enemy']);
  }
  abstract life: number;
}