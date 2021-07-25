import { SpriteActor } from '../../../engine/actor';
import { AssetManager, Sprite } from '../../../engine/asset';
import { Circle, Rect } from '../../../engine/shape';
import { stageRect, playerConf } from '../../../const';
import { updateObj } from '../../../engine/game/scene';
import { ShotA, ShotB } from './player-shot';

export class Player extends SpriteActor {
  constructor(x: number, y: number, assets: AssetManager, center: Rect) {
    super(x, y, new Circle(x, y, 10), ['player', 'character'], center);
    const playerSprite = assets.sprite(playerConf.sprite.name);
    this.sprites = {
      main: playerSprite,
      bulletA: assets.sprite(playerConf.shotA.sprite.name),
      bulletB: assets.sprite(playerConf.shotB.sprite.name),
    };
  }
  private _timeCountA = 0;
  private _timeCountB = 0;
  private _shotIntervalA = playerConf.shotA.interval;
  private _shotIntervalB = playerConf.shotB.interval;
  private sprites: { main: Sprite; bulletA: Sprite; bulletB: Sprite };
  public speed = playerConf.speed;
  public power = 100;
  public life = 3;
  public bomb = 3;

  update(obj: updateObj): void {
    this._move(obj);
    this.render(obj);
    this._shot(obj);
  }

  private _move({ input }: updateObj): void {
    const movingDirection = input.isSlow
      ? input.direction.times(this.speed / 2)
      : input.direction.times(this.speed);

    this.x += movingDirection.x;
    this.y += movingDirection.y;

    this.x =
      this.x > stageRect.rx
        ? stageRect.rx
        : this.x < stageRect.lx
        ? stageRect.lx
        : this.x;
    this.y =
      this.y > stageRect.by
        ? stageRect.by
        : this.y < stageRect.ty
        ? stageRect.ty
        : this.y;
  }
  private _shot({ input }: updateObj): void {
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

  render({ ctx }: updateObj): void {
    this.drawSprite(
      ctx,
      this.sprites.main,
      playerConf.sprite.width,
      playerConf.sprite.rotate
    );
  }
}
