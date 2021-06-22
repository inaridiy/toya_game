import { SpriteActor } from '../../base/actor';
import { Circle } from '../../base/actor/shape';
import { GameInfo } from '../../base/event/event-dispatcher';
import { Input } from '../../base/event/input';
import { Scene } from '../../base/game/scene';
import { Sprite } from '../../base/assets/sprite';
import { Vec2 } from '../../base/vector/vec';

export class Player extends SpriteActor {
  constructor(
    x: number,
    y: number,
    public sprites: { main: Sprite },
    public speed: number
  ) {
    super(x, y, new Circle(x, y, 5), ['player', 'character']);
  }

  update(gameInfo: GameInfo, input: Input): void {
    const movingDirection = new Vec2(0, 0);
    input.getKey('ArrowUp') || movingDirection.y++;
    input.getKey('ArrowDown') || movingDirection.y--;
    input.getKey('ArrowRight') || movingDirection.x--;
    input.getKey('ArrowLeft') || movingDirection.x++;

    const speedVec = movingDirection.normalized.times(this.speed);
    this.x += speedVec.x;
    this.y += speedVec.y;
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprites.main);
  }
}