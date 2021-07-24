import { size } from '../../const';
import { AssetManager } from '../../engine/asset';
import { Scene, updateObj } from '../../engine/game/scene';
import { Stage } from '../../engine/game/stage';
import { Player } from '../actor/player';
import { BezierAcotr } from '../actor/test';

export class Test extends Stage {
  constructor(assets: AssetManager) {
    super();
    const player = new Player(0, 0, assets, this.stageRect);
    this.add(player);
    console.log(player.coord);

    const ba = new BezierAcotr(100, 100, assets);
    this.add(ba);

    const testFunc = ({ ctx }: updateObj) => {
      ctx.beginPath();
      ctx.fillStyle = '#00ffee';
      ctx.fillRect(0, 0, size.x, size.y);
      ctx.clearRect(
        this.stageRect.lx,
        this.stageRect.ty,
        this.stageRect.width,
        this.stageRect.height
      );
      ctx.fill();
      ctx.rect(
        this.stageRect.lx,
        this.stageRect.ty,
        this.stageRect.width,
        this.stageRect.height
      );
      ctx.clip();
      //console.log(this.stageRect.by);
    };
    this.beforeFuncs.push(testFunc);
  }
}
