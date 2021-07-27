import { SpriteActor } from '../../engine/actor';
import { Circle } from '../../engine/shape';
import { stageObj, typeStageObjs, typeStageObj, stageRect } from '../../const';
import { Vec2 } from '../../engine/shape/vector';
import { updateObj } from '../../engine/game/scene';
import { AssetManager, Sprite } from '../../engine/asset';

const { power: powerConf } = stageObj;

export class Power extends SpriteActor {
  constructor(
    x: number,
    y: number,
    public size: keyof typeStageObjs['power'],
    assets: AssetManager
  ) {
    super(
      x,
      y,
      new Circle(x, y, powerConf[size].hitSize),
      ['power'],
      stageRect
    );
    const conf = powerConf[size];
    const initSpeed = Math.round(
      Math.random() * (conf.maxInitSpeed - conf.minInitSpeed) +
        conf.minInitSpeed
    );

    this.vec = new Vec2(
      Math.random() * 2 - 1,
      Math.random() * -1
    ).normalized.times(initSpeed);

    this.sprite = assets.sprite(conf.sprite.name);
    this.conf = conf;
  }
  public vec: Vec2;
  public sprite: Sprite;
  public conf: typeStageObj;

  update({ ctx }: updateObj): void {
    //console.log(this.coord);
    this.fall();
    this.render(ctx);
  }
  fall(): void {
    this.x += this.vec.x;
    this.y += this.vec.y;

    this.vec.y += this.conf.gravity;
    if (this.vec.magnitude > this.conf.maxSpeed) {
      this.vec = this.vec.normalized.times(this.conf.maxSpeed);
    }
  }
  render(ctx: CanvasRenderingContext2D): void {
    // / console.log(this.sprite);
    this.drawSprite(
      ctx,
      this.sprite,
      this.conf.sprite.width,
      this.conf.sprite.rotate
    );
  }
}
