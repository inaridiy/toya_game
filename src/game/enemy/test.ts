import { Enemy } from '.';
import { Rectangle } from '../../base/actor/shape';
import { Sprite } from '../../base/assets/sprite';
import { AssetManager } from '../../base/assets/asset-loader';

export class TestMob extends Enemy {
  constructor(x: number, y: number, assets: AssetManager) {
    super(x, y, new Rectangle(x, y, 50, 50));
    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('playerBullet')) {
        this.life--;
      }
    });
    this.sprite = this.init(assets);
  }

  public life = 20;
  public sprite: Sprite;
  public timeCount = 0;

  init(assets: AssetManager) {
    const mobImg = assets.get('yugamin');
    const sprite = new Sprite(
      mobImg,
      new Rectangle(0, 0, mobImg.width, mobImg.height)
    );
    return sprite;
  }

  update(): void {
    this.x = Math.cos(this.timeCount / 40) * 300 + 500;
    this.y = Math.sin(this.timeCount / 40) * 100 + 100;
    this.timeCount++;
    if (this.life <= 0) {
      this.destroy();
    }
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprite, 100);
  }
}
export class TestMob2 extends Enemy {
  constructor(x: number, y: number, assets: AssetManager) {
    super(x, y, new Rectangle(x, y, 50, 50));
    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('playerBullet')) {
        this.life--;
      }
    });
    this.sprite = this.init(assets);
  }

  public life = 5;
  public sprite: Sprite;
  public timeCount = 0;

  init(assets: AssetManager) {
    const mobImg = assets.get('yugamin');
    const sprite = new Sprite(
      mobImg,
      new Rectangle(0, 0, mobImg.width, mobImg.height)
    );
    return sprite;
  }

  update(): void {
    this.x = Math.sin(this.timeCount / 40) * 300 + 500;
    this.y = Math.cos(this.timeCount / 40) * 100 + 100;
    this.timeCount++;
    if (this.life <= 0) {
      this.destroy();
    }
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(ctx, this.sprite, 100);
  }
}