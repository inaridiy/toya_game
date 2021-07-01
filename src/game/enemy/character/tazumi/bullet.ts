import { Sprite } from '../../../../base/assets/sprite';
import { Vec2 } from '../../../../base/vector/vec';
import { NormalBullet } from '../../bullet';
import { Circle } from '../../../../base/actor/shape';

export class TazumiBulletA extends NormalBullet {
  constructor(x: number, y: number, vec: Vec2, sprite: Sprite) {
    super(x, y, vec, new Circle(x, y, 15), sprite, 40, 90, ['tazumiBullet']);
  }
}
