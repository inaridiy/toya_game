import { SpriteActor } from '../../../engine/actor';
import { AssetManager, Sprite } from '../../../engine/asset';
import { Circle } from '../../../engine/shape';
import { Input } from '../../../engine/game/event/input';
import { Scene, updateObj } from '../../../engine/game/scene';
import { ShotA, ShotB } from './player-shot';

export class Player extends SpriteActor {
  constructor(x: number, y: number, assets: AssetManager) {
    super(x, y, new Circle(x, y, 10), ['player', 'character']);
    const playerSprite = assets.sprite('kubi');
    this.sprites = {
      main: playerSprite,
      bulletA: assets.sprite('sinai'),
      bulletB: assets.sprite('ago'),
    };
    console.log(this);
  }
  private _timeCountA = 0;
  private _timeCountB = 0;
  private _shotIntervalA = 7;
  private _shotIntervalB = 10;
  private sprites: { main: Sprite; bulletA: Sprite; bulletB: Sprite };
  public speed = 10;
  public power = 100;

  update({ input, ctx }: updateObj): void {
    this._move(input);
    this.render(ctx);
    this._shot(input);
  }

  private _move(input: Input): void {
    const movingDirection = input.isSlow
      ? input.direction.times(this.speed / 2)
      : input.direction.times(this.speed);

    this.x += movingDirection.x;
    this.y += movingDirection.y;
  }
  private _shot(input: Input): void {
    this._timeCountA++;
    this._timeCountB++;
    if (this._timeCountA > this._shotIntervalA && input.isShot) {
      this.spawnActor(
        new ShotA(this.x, this.y, this.power, this.sprites.bulletA)
      );
      this._timeCountA = 0;
    }

    if (this._timeCountB > this._shotIntervalB && input.isShot) {
      this.spawnActor(
        new ShotB(this.x, this.y, this.power, this.sprites.bulletB)
      );
      this._timeCountB = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprites.main, 100, 180);
  }
}
