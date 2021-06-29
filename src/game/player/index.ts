import { SpriteActor } from '../../base/actor';
import { Circle } from '../../base/actor/shape';
import { Input } from '../../base/event/input';
import { Sprite } from '../../base/assets/sprite';
import { Vec2 } from '../../base/vector/vec';
import { PlayerBulletB } from './player-bullet';
import { AssetManager } from '../../base/assets/asset-loader';
import { Rectangle } from '../../base/actor/shape';

export class Player extends SpriteActor {
  constructor(
    x: number,
    y: number,
    assets: AssetManager,
    public speed: number
  ) {
    super(x, y, new Circle(x, y, 5), ['player', 'character']);
    const playerImg = assets.get('ago');
    const sprite = new Sprite(
      playerImg,
      new Rectangle(0, 0, playerImg.width, playerImg.height)
    );
    this.sprites = { main: sprite, bullet: sprite };
  }

  private _timeCount = 0;
  private _shotInterval = 10;
  public sprites: { main: Sprite; bullet: Sprite };

  update(gameInfo: never, input: Input): void {
    this._move(input);
    this._shot(input);
  }

  private _move(input: Input): void {
    const movingDirection = new Vec2(0, 0);
    input.getKey('ArrowUp') || movingDirection.y++;
    input.getKey('ArrowDown') || movingDirection.y--;
    input.getKey('ArrowRight') || movingDirection.x--;
    input.getKey('ArrowLeft') || movingDirection.x++;

    const speedVec = movingDirection.normalized.times(this.speed);
    this.x += speedVec.x;
    this.y += speedVec.y;
  }

  private _shot(input: Input): void {
    this._timeCount++;
    const isFireReader = this._timeCount > this._shotInterval;
    if (isFireReader && input.getKey(' ')) {
      const bullet = new PlayerBulletB(this.x, this.y, this.sprites.bullet);
      this.spawnActor(bullet);

      this._timeCount = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprites.main, 100, 0);
  }
}
