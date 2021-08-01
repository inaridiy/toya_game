import { typeSprite, enemyShot } from '../../../const';
import { Actor } from '../../../engine/actor';
import { updateObj } from '../../../engine/game/scene';
import { Circle, Coord, None } from '../../../engine/shape';
import { Vec2 } from '../../../engine/shape/vector';
import { Player } from '../player';
import { simplebullet } from './enemy-bullet';

const { shotA, shotB } = enemyShot;
export class CircularShot extends Actor {
  constructor(
    coord: Coord,
    public hitSize: number,
    public qty: number,
    public spriteData: typeSprite,
    public speed: number
  ) {
    super(coord.x, coord.y, new None(0, 0));
  }
  update({ scene }: updateObj): void {
    const [player] = scene.get('player') as Player[] | undefined[];
    const direction = player
      ? new Vec2(player.x - this.x, player.y - this.y).angle
      : new Vec2(0, 1).angle;
    const startDirection =
      direction - Math.PI / 2 + (Math.random() / 4 - 0.125);
    for (let i = 0; i < this.qty; i++) {
      const angle = startDirection + (Math.PI / (this.qty - 1)) * i;
      this.spawnActor(
        new simplebullet(
          this.coord,
          new Circle(this.x, this.y, this.hitSize),
          this.spriteData,
          Vec2.radian(angle),
          this.speed
        )
      );
    }
    this.destroy();
  }
}

export class EnemyShotA extends CircularShot {
  constructor(coord: Coord, mode: 0 | 1 | 2) {
    super(coord, shotA.hitSize, shotA[mode].qty, shotA.sprite, shotA.speed);
  }
}
export class EnemyShotB extends CircularShot {
  constructor(coord: Coord, mode: 0 | 1 | 2) {
    super(coord, shotB.hitSize, shotB[mode].qty, shotB.sprite, shotB.speed);
  }
}
