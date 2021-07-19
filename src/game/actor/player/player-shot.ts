import { Actor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { updateObj } from '../../../engine/game/scene';
import { Coord, None } from '../../../engine/shape';
import { Vec2 } from '../../../engine/shape/vector';
import { PlayerBulletA, PlayerBulletB } from './player-bullet';

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
    const qty = Math.ceil(p / 15);
    const angleBetween = input.isSlow ? 3 : 10;
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

  public angleBetween = 30;
  update(obj: updateObj): void {
    const [lCoord, lAngle] = obj.input.isSlow
      ? [new Coord(this.x, this.y - 100), 90]
      : [new Coord(this.x - 100, this.y), 120];
    this.spawnBullets(obj, lCoord, lAngle, 1);

    const [rCoord, rAngle] = obj.input.isSlow
      ? [new Coord(this.x, this.y - 100), 90]
      : [new Coord(this.x + 100, this.y), 60];
    this.spawnBullets(obj, rCoord, rAngle, -1);

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
    adding: number
  ): void {
    if (this.power >= 10) {
      this.spawnBullet(obj, startCood, startAngle);
    }
    if (this.power >= 50) {
      this.spawnBullet(obj, startCood, startAngle + this.angleBetween * adding);
    }
    if (this.power >= 100) {
      this.spawnBullet(
        obj,
        startCood,
        startAngle + this.angleBetween * 2 * adding
      );
    }
  }
}
