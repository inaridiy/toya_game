import { Enemy } from '..';
import { Rectangle } from '../../../../base/actor/shape';
import { AssetManager } from '../../../../base/assets/asset-loader';
import { Sprite } from '../../../../base/assets/sprite';
import { Vec2 } from '../../../../base/vector/vec';
import { TazumiBulletA } from './bullet';

export class Tazumi extends Enemy {
  constructor(x: number, y: number, assets: AssetManager) {
    super(x, y, new Rectangle(x, y, 50, 50));
    const img = assets.get('tazumi');
    this.sprites = { main: Sprite.sprite(img), bullet: Sprite.sprite(img) };
  }
  public sprites: { [k: string]: Sprite };
  public life = 100;
  public timeCount = 0;

  shotBullet(angle: number, speed: number) {
    const vec = new Vec2(Math.cos(angle), Math.sin(angle)).times(speed);
    const bullet = new TazumiBulletA(this.x, this.y, vec, this.sprites.bullet);
    this.spawnActor(bullet);
  }
  shootCircularBullets(num: number, speed: number) {
    const angle = (Math.PI * 2) / num;
    for (let i = 0; i < num; i++) {
      console.log('shot');
      this.shotBullet(angle * i, speed);
    }
  }

  update(): void {
    // インターバルを経過していたら弾を撃つ
    this.timeCount++;
    if (this.timeCount > 10) {
      this.shootCircularBullets(20, 10);
      this.timeCount = 0;
    }
    // HPがゼロになったらdestroyする
    if (this.life <= 0) {
      this.destroy();
    }
    if (this.life <= 0) {
      this.destroy();
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.drawSprite(ctx, this.sprites.main, 200);
  }
}
