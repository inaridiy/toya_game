import { SpriteActor, Actor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { Circle, Coord } from '../../../engine/shape';
import { Vec2 } from '../../../engine/shape/vector';
import { Scene, updateObj } from '../../../engine/game/scene';
import { playerConf } from '../../../const';
const { shotA: confA, shotB: confB } = playerConf;

export abstract class PlayerBullet extends SpriteActor {
  constructor(
    x: number,
    y: number,
    radius: number,
    public damage: number,
    public sprite: Sprite
  ) {
    super(x, y, new Circle(x, y, radius), ['playerBullet']);

    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('enemy')) {
        this.destroy();
      }
    });
  }

  getEnemy(scene: Scene): Actor | null {
    const enemies = scene.get('enemy');
    return enemies.length
      ? enemies.reduce((pv, actor) => {
          return this.coord.getDistance(pv.coord) >
            this.coord.getDistance(actor.coord)
            ? pv
            : actor;
        })
      : null;
  }
}
export class PlayerBulletA extends PlayerBullet {
  constructor(coord: Coord, vec: Vec2, sprite: Sprite) {
    super(coord.x, coord.y, confA.hitSize, confA.damage, sprite);
    this.speedVec = vec.times(this.speed);
  }

  speedVec: Vec2;
  speed = confA.speed;

  update({ ctx }: updateObj): void {
    this.x += this.speedVec.x;
    this.y += this.speedVec.y;

    this.render(ctx);
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 0.8;
    this.drawSprite(
      ctx,
      this.sprite,
      confA.sprite.width,
      (Math.atan2(this.speedVec.y, this.speedVec.x) * 180) / Math.PI +
        confA.sprite.rotate
    );
    ctx.globalAlpha = 1;
  }
}

export class PlayerBulletB extends PlayerBullet {
  constructor(coord: Coord, sprite: Sprite, direction: Vec2, scene: Scene) {
    super(coord.x, coord.y, confB.hitSize, confB.damage, sprite);
    this.speedVec = direction;
    this.target = this.getEnemy(scene);

    this.target?.addEventListener('destroy', () => {
      this.target = this.getEnemy(scene);
    });
  }

  speedVec: Vec2;
  curvature = (confB.curvature * Math.PI) / 180;
  target: Actor | null;
  speed = confB.speed;
  timeCount = 0;
  limit = confB.trackingLimit;

  update({ ctx }: updateObj): void {
    let speedAngle = Math.atan2(this.speedVec.y, this.speedVec.x);
    this.timeCount++;

    if (this.target && this.timeCount < this.limit) {
      const enemyVec = new Vec2(this.target.x - this.x, this.target.y - this.y);
      const cross = Vec2.cross(this.speedVec.normalized, enemyVec.normalized);

      if (cross < -0.5) {
        speedAngle -= this.curvature;
      } else if (cross > 0.5) {
        speedAngle += this.curvature;
      }
    }

    this.speedVec = new Vec2(
      Math.cos(speedAngle),
      Math.sin(speedAngle)
    ).normalized.times(this.speed);

    this.x += this.speedVec.x;
    this.y += this.speedVec.y;

    this.render(ctx);
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.globalAlpha = 0.8;
    this.drawSprite(
      ctx,
      this.sprite,
      confB.sprite.width,
      (Math.atan2(this.speedVec.y, this.speedVec.x) * 180) / Math.PI +
        confB.sprite.rotate
    );
    ctx.globalAlpha = 1;
  }
}
