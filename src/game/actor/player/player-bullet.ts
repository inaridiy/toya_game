import { SpriteActor, Actor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { Circle } from '../../../engine/shape';
import { Vec2 } from '../../../engine/shape/vector';
import { Scene, updateObj } from '../../../engine/game/scene';

export abstract class PlayerBullet extends SpriteActor {
  constructor(x: number, y: number, radius: number, public sprite: Sprite) {
    super(x, y, new Circle(x, y, radius), ['playerBullet']);

    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('enemy')) {
        this.destroy();
      }
    });
  }
  getEnemy(scene: Scene): Actor | null {
    const enemies = scene.actors.filter((actor) => actor.hasTag('enemy'));
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
  constructor(
    x: number,
    y: number,
    sprite: Sprite,

    scene: Scene
  ) {
    super(x, y, 15, sprite);
    this.speedVec = new Vec2(0, 1).normalized.times(this.speed);
  }

  public speedVec: Vec2;
  public speed = 15;

  update({ gameInfo, ctx }: updateObj): void {
    this.x += this.speedVec.x;
    this.y += this.speedVec.y;

    if (!gameInfo.screenRect.isInside(this.coord)) {
      this.destroy();
    }
    this.render(ctx);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(
      ctx,
      this.sprite,
      40,
      (Math.atan2(this.speedVec.y, this.speedVec.x) * 180) / Math.PI - 90
    );
  }
}

export class PlayerBulletB extends PlayerBullet {
  constructor(
    x: number,
    y: number,
    sprite: Sprite,
    direction: Vec2,
    scene: Scene
  ) {
    super(x, y, 15, sprite);
    this.speedVec = direction;
    this.target = this.getEnemy(scene);

    this.target?.addEventListener('destroy', () => {
      this.target = this.getEnemy(scene);
    });
  }

  public speedVec: Vec2;
  public curvature = (10 * Math.PI) / 180;
  public target: Actor | null;
  public speed = 15;
  timeCount = 0;
  limit = 180;

  update({ gameInfo, ctx }: updateObj): void {
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

    if (!gameInfo.screenRect.isInside(this.coord)) {
      this.destroy();
    }
    this.render(ctx);
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(
      ctx,
      this.sprite,
      40,
      (Math.atan2(this.speedVec.y, this.speedVec.x) * 180) / Math.PI - 90
    );
  }
}
