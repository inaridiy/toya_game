import { Actor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { updateObj } from '../../../engine/game/scene';
import { Coord, None } from '../../../engine/shape';
import { Vec2 } from '../../../engine/shape/vector';
import { PlayerBulletA, PlayerBulletB } from './player-bullet';
import { playerConf } from '../../../const';
const { shotA: confA, shotB: confB } = playerConf;

abstract class PlayerShot extends Actor {
  constructor(x: number, y: number, public power: number) {
    super(x, y, new None(0, 0));
  }
}

export class ShotA extends PlayerShot {
  constructor(x: number, y: number, power: number, public sprite: Sprite) {
    super(x, y, power);
  }

  update({ input }: updateObj): void {
    const p = this.power;
    const qty = Math.ceil(p / confA.qtyPerPower);
    const angleBetween = input.isSlow
      ? confA.angleBetween.slow
      : confA.angleBetween.normal;
    const totalAngle = (qty - 1) * angleBetween;
    const rightmostAngle = 90 - totalAngle / 2;

    for (let i = 0; i < qty; i++) {
      this.spawnBullet(this.coord, rightmostAngle + angleBetween * i);
    }
    this.destroy();
  }
  spawnBullet(coord: Coord, dgree: number): void {
    this.spawnActor(
      new PlayerBulletA(coord, Vec2.degree(dgree).yReversal, this.sprite)
    );
  }
}

export class ShotB extends PlayerShot {
  constructor(x: number, y: number, power: number, public sprite: Sprite) {
    super(x, y, power);
  }

  update(obj: updateObj): void {
    const {
      angleBetween,
      left: [lCoord, lAngle],
      right: [rCoord, rAngle],
    } = obj.input.isSlow
      ? {
          angleBetween: confB.angleBetween.slow,
          left: [
            Coord.add(this.coord, confB.left.slow.coord),
            confB.left.slow.angle,
          ],
          right: [
            Coord.add(this.coord, confB.right.slow.coord),
            confB.right.slow.angle,
          ],
        }
      : {
          angleBetween: confB.angleBetween.normal,
          left: [
            Coord.add(this.coord, confB.left.normal.coord),
            confB.left.normal.angle,
          ],
          right: [
            Coord.add(this.coord, confB.right.normal.coord),
            confB.right.normal.angle,
          ],
        };

    this.spawnBullets(obj, lCoord, lAngle, angleBetween, 1);
    this.spawnBullets(obj, rCoord, rAngle, angleBetween, -1);

    this.destroy();
  }

  spawnBullet({ scene }: updateObj, coord: Coord, dgree: number): void {
    this.spawnActor(
      new PlayerBulletB(coord, this.sprite, Vec2.degree(dgree).yReversal, scene)
    );
  }

  spawnBullets(
    obj: updateObj,
    startCood: Coord,
    startAngle: number,
    angleBetween: number,
    adding: number
  ): void {
    confB.incrTims.forEach((tim, i) => {
      if (this.power >= tim) {
        this.spawnBullet(
          obj,
          startCood,
          startAngle + angleBetween * i * adding
        );
      }
    });
  }
}
