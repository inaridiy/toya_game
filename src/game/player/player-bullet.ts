import { Actor, SpriteActor } from '../../base/actor';
import { Circle } from '../../base/actor/shape';
import { Sprite } from '../../base/assets/sprite';
import { GameInfo } from '../../base/event/event-dispatcher';
import { Vec2 } from '../../base/vector/vec';
import { Scene } from '../../base/game/scene';
import { Input } from '../../base/event/input';

export abstract class PlayerBullet extends SpriteActor {
  constructor(
    x: number,
    y: number,
    radius: number,
    public sprite: Sprite,
    public speed: number
  ) {
    super(x, y, new Circle(x, y, radius), ['playerBullet']);

    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('enemy')) {
        this.destroy();
      }
    });
  }
}

export class PlayerBulletA extends PlayerBullet {
  constructor(x: number, y: number, sprite: Sprite) {
    const hitRadius = 5;
    const speed = 15;

    super(x, y, hitRadius, sprite, speed);
  }
  update(gameInfo: GameInfo): void {
    this.y -= this.speed;
    if (!gameInfo.screenRect.isInside(this.coord)) {
      this.destroy();
    }
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprite, 40, 180);
  }
}

export class PlayerBulletB extends PlayerBullet {
  constructor(x: number, y: number, sprite: Sprite) {
    super(x, y, 5, sprite, 10);
  }
  public speedVec = new Vec2(0, -1);
  public curvature = (2 * Math.PI) / 180;

  update(gameInfo: GameInfo, input: Input, scene: Scene) {
    const { actors } = scene;
    const enemies = actors.filter((actor) => actor.hasTag('enemy'));
    let speedAngle = Math.atan2(this.speedVec.y, this.speedVec.x);

    if (enemies.length) {
      const nearestEnemy = enemies.reduce((pv, actor) => {
        return this.coord.getDistance(pv.coord) >
          this.coord.getDistance(actor.coord)
          ? pv
          : actor;
      });
      const enemyVec = new Vec2(
        nearestEnemy.x - this.x,
        nearestEnemy.y - this.y
      );
      const cross = Vec2.cross(this.speedVec, enemyVec);

      if (cross < 0) {
        speedAngle -= this.curvature;
      } else if (cross > 0) {
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

export class PlayerBulletC extends PlayerBullet {
  constructor(x: number, y: number, sprite: Sprite) {
    super(x, y, 5, sprite, 10);
  }
  public speedVec = new Vec2(-1, -1);
  public curvature = (2 * Math.PI) / 180;

  update(gameInfo: GameInfo, input: Input, scene: Scene) {
    const { actors } = scene;
    const nearestEnemy = actors
      .filter((actor) => actor.hasTag('enemy'))
      .reduce((pv, actor) => {
        return this.coord.getDistance(pv.coord) >
          this.coord.getDistance(actor.coord)
          ? pv
          : actor;
      });
    this.speedVec = new Vec2(
      nearestEnemy.x - this.x,
      nearestEnemy.y - this.y
    ).normalized.times(this.speed);

    this.x += this.speedVec.x;
    this.y += this.speedVec.y;

    if (!gameInfo.screenRect.isInside(this.coord)) {
      this.destroy();
    }
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
