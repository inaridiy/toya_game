import { SpriteActor } from '../../../engine/actor';
import { AssetManager, Sprite } from '../../../engine/asset';
import { Circle } from '../../../engine/shape';
import { Input } from '../../../engine/game/event/input';
import { Scene, updateObj } from '../../../engine/game/scene';
import { PlayerBulletB } from './player-bullet';
import { Vec2 } from '../../../engine/shape/vector';

export class Player extends SpriteActor {
  constructor(x: number, y: number, assets: AssetManager) {
    super(x, y, new Circle(x, y, 10), ['player', 'character']);
    const playerSprite = assets.sprite('kubi');
    const bulletSprite = assets.sprite('ago');
    this.sprites = { main: playerSprite, bulletB: bulletSprite };
  }
  private _timeCount = 0;
  private _shotInterval = 10;
  public sprites: { main: Sprite; bulletB: Sprite };
  public speed = 10;

  update({ input, ctx, scene }: updateObj): void {
    this._move(input);
    this.render(ctx);
    this._shot(input, scene);
    // this._shot(input, scene);
  }

  private _move(input: Input): void {
    const movingDirection = input.direction.times(this.speed);
    this.x += movingDirection.x;
    this.y += movingDirection.y;
  }
  private _shot(input: Input, scene: Scene): void {
    this._timeCount++;
    const isFireReader = this._timeCount > this._shotInterval;
    if (isFireReader && input.isShot) {
      this.spawnActor(
        new PlayerBulletB(
          this.x,
          this.y,
          this.sprites.bulletB,
          new Vec2(-0.8, -1),
          scene
        )
      );
      this.spawnActor(
        new PlayerBulletB(
          this.x,
          this.y,
          this.sprites.bulletB,
          new Vec2(0.8, -1),
          scene
        )
      );
      this._timeCount = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprites.main, 100, 0);
  }
}
