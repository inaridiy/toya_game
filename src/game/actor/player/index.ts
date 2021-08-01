import { SpriteActor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { Circle } from '../../../engine/shape';
import { stageRect, playerConf } from '../../../const';
import { Scene, updateObj } from '../../../engine/game/scene';
import { ShotA, ShotB } from './player-shot';
import { Power } from '../obj';
import { assets } from '../../../assets';
import { BombA } from './bomb';

export class Player extends SpriteActor {
  constructor(x: number, y: number, scene: Scene, public life = 3) {
    super(
      x,
      y,
      new Circle(x, y, playerConf.hitSize),
      ['player', 'character'],
      stageRect
    );
    const playerSprite = assets.sprite(playerConf.sprite.name);
    this.sprites = {
      main: playerSprite,
      bulletA: assets.sprite(playerConf.shotA.sprite.name),
      bulletB: assets.sprite(playerConf.shotB.sprite.name),
    };

    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('power')) {
        const power = e.target as Power;
        power.destroy();
        this.power += power.conf.incr;
        if (this.power > playerConf.maxPower) {
          this.power = playerConf.maxPower;
        }
      } else if (e.target.hasTag('enemyBullet')) {
        this.life--;
        scene.get('enemyBullet').forEach((actor) => actor.destroy());
        for (let i = 0; i < this.power / 15; i++) {
          this.spawnActor(new Power(0, -300, 'large'));
        }

        this.x = stageRect.x;
        this.y = stageRect.y + 300;
      }
    });
  }

  private _timeCountA = 0;
  private _timeCountB = 0;
  private _shotIntervalA = playerConf.shotA.interval;
  private _shotIntervalB = playerConf.shotB.interval;
  private sprites: { main: Sprite; bulletA: Sprite; bulletB: Sprite };
  public speed = playerConf.speed;
  public power = 1;
  public bomb = 3;

  update(obj: updateObj): void {
    this._move(obj);
    this._shot(obj);
    this._bomb(obj);
    this._debug(obj);
    this.render(obj);
  }
  private _bomb({ input }: updateObj) {
    if (input.isBomb) {
      //this.spawnActor(new BombA());
    }
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
  _debug({ scene, input: { keyInput } }: updateObj): void {
    if (!scene.debug) return;
    if (keyInput.getKey('0')) console.log(this);
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
