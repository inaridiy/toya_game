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
  constructor(
    x: number,
    y: number,
    sprite: Sprite,
    direction: Vec2,
    scene: Scene
  ) {
    super(x, y, 5, sprite, 15);
    this.speedVec = direction;
    this.target = this.getEnemy(scene);

    this.target?.addEventListener('destroy', () => {
      this.target = this.getEnemy(scene);
    });
  }
  public speedVec: Vec2;
  public curvature = (3 * Math.PI) / 180;
  public target: Actor | null;

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

  update(gameInfo: GameInfo): void {
    let speedAngle = Math.atan2(this.speedVec.y, this.speedVec.x);

    if (this.target) {
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
