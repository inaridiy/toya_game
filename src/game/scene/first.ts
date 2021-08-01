import { assets } from '../../assets';
import { drawSprite } from '../../engine/asset';
import { Scene, updateObj } from '../../engine/game/scene';
import { Vec2 } from '../../engine/shape/vector';
import { RotatingKenmoti } from '../actor/title';
import { FirstStage } from '../stage/firstStage';
import { Test } from './test';

export class First extends Scene {
  constructor() {
    super();
    this.add(new RotatingKenmoti(0, 0, new Vec2(1, 1)));
    this.add(new RotatingKenmoti(200, 200, new Vec2(-2, 5)));
    this.add(new RotatingKenmoti(-200, -200, new Vec2(2, -5)));

    let pressed = false;
    let choose = 0;
    const playBtn = ({ ctx, input }: updateObj) => {
      ctx.font = '100px OtomanopeeOne';
      ctx.fillStyle = 'black';
      ctx.fillText('Easy', 300, 300);
      ctx.fillText('Normal', 300, 400);
      ctx.fillText('Hard', 300, 500);

      if (input.keyInput.getKeyUp('ArrowDown')) {
        choose++;
      }
      if (input.keyInput.getKeyUp('ArrowUp')) {
        choose--;
      }
      choose = choose < 0 ? 2 : choose % 3;

      drawSprite(ctx, 230, 265 + choose * 100, assets.sprite('kubi'), 100, -90);

      ctx.globalAlpha = 1;
      if (input.isShot && !pressed) {
        pressed = true;
        console.log(choose);
        setTimeout(
          () => this.changeScene(new FirstStage(choose as 0 | 1 | 2)),
          1000
        );
      }
      if (pressed) {
        drawSprite(ctx, 600, 275, assets.sprite('dasai'), 300);
      }
    };
    this.afterFuncs.push(playBtn);
  }
}
