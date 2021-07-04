import { Enemy } from '..';
import { Rectangle } from '../../../base/actor/shape';
import { AssetManager } from '../../../base/assets/asset-loader';
import { Sprite } from '../../../base/assets/sprite';
import { Vec2 } from '../../../base/vector/vec';
import { TazumiBulletA, CircularBullet, WhirlpoolBullet } from './bullet';

export class Tazumi extends Enemy {
  constructor(x: number, y: number, assets: AssetManager) {
    super(x, y, new Rectangle(x, y, 50, 50));
    const img = assets.get('tazumi');
    this.sprites = { main: Sprite.get(img), bullet: Sprite.get(img) };
    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('playerBullet')) {
        this.life--;
      }
    });
  }
  public sprites: { [k: string]: Sprite };
  public life = 100;
  public timeCount = 0;

  update(): void {
    // インターバルを経過していたら弾を撃つ
    this.timeCount++;
    if (this.timeCount === 1) {
      this.spawnActor(
        new WhirlpoolBullet(this.x, this.y, 10, 5, this.sprites.bullet)
      );
    } else if (this.timeCount < 540 && this.timeCount > 300) {
      this.timeCount < 420 ? (this.x += 5) : (this.x -= 5);

      this.timeCount % 20 === 0 &&
        this.spawnActor(
          new CircularBullet(this.x, this.y, 36, 8, this.sprites.bullet)
        );
    } else if (this.timeCount > 600) {
      this.timeCount = 0;
    }
    if (this.life <= 0) {
      this.destroy();
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.drawSprite(ctx, this.sprites.main, 200);
  }
}
