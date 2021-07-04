import { Sprite } from '../../../base/assets/sprite';
import { Vec2 } from '../../../base/vector/vec';
import { NormalBullet } from '..';
import { Circle, None } from '../../../base/actor/shape';
import { Actor } from '../../../base/actor';

export class TazumiBulletA extends NormalBullet {
  constructor(x: number, y: number, vec: Vec2, sprite: Sprite) {
    super(x, y, vec, new Circle(x, y, 15), sprite, 40, 90, ['tazumiBullet']);
  }
}

export class CircularBullet extends Actor {
  constructor(
    x: number,
    y: number,
    protected quantity: number,
    protected speed: number,
    protected sprite: Sprite
  ) {
    super(x, y, new None());
  }

  shootCircularBullets(num: number, speed: number, initialangle: number = 0) {
    const centerAngle = (Math.PI * 2) / num;
    for (let i = 0; i < num; i++) {
      const angle = centerAngle * i + initialangle;
      const vec = new Vec2(Math.cos(angle), Math.sin(angle)).times(speed);
      const bullet = new TazumiBulletA(this.x, this.y, vec, this.sprite);
      this.spawnActor(bullet);
    }
  }

  update(): void {
    this.shootCircularBullets(this.quantity, this.speed);
    this.destroy();
  }
  render() {}
}

export class WhirlpoolBullet extends CircularBullet {
  constructor(
    x: number,
    y: number,
    quantity: number,
    speed: number,
    sprite: Sprite,
    public executed: number = 18,
    public interval: number = 10,
    public angleOfRotation: number = (10 / 180) * Math.PI
  ) {
    super(x, y, quantity, speed, sprite);
  }
  private timeCount = 0;
  private count = 0;

  update() {
    this.timeCount++;
    if (this.timeCount > this.interval && this.count <= this.executed) {
      this.shootCircularBullets(
        this.quantity,
        this.speed,
        this.count * this.angleOfRotation
      );
      this.count++;
      this.timeCount = 0;
    } else if (this.count > this.executed) {
      this.destroy();
    }
  }
}
