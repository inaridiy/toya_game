import { SpriteActor } from '../../base/actor';
import { Circle } from '../../base/actor/shape';
import { GameInfo } from '../../base/event/event-dispatcher';
import { Input } from '../../base/event/input';
import { Scene } from '../../base/game/scene';
import { Sprite } from '../../base/assets/sprite';
import { Vec2 } from '../../base/vector/vec';
import { PlayerBulletA } from './player-bullet';

export class Player extends SpriteActor {
  constructor(
    x: number,
    y: number,
    public sprites: { main: Sprite; bullet: Sprite },
    public speed: number
  ) {
    super(x, y, new Circle(x, y, 5), ['player', 'character']);
  }

  private _timeCount = 0;
  private _shotInterval = 10;

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
      const bullet = new PlayerBulletA(this.x, this.y, this.sprites.bullet);
      this.spawnActor(bullet);
      this._timeCount = 0;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprites.main, 100, 0);
  }
}
