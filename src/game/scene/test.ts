import { AssetManager } from '../../engine/asset';
import { Stage } from '../../engine/game/stage';
import { Player } from '../actor/player';
import { BezierAcotr } from '../actor/test';

export class Test extends Stage {
  constructor(assets: AssetManager) {
    super(assets.get('bgImg'));
    const player = new Player(0, 0, assets, this.stageRect);
    this.add(player);
    console.log(player.coord);

    const ba = new BezierAcotr(100, 100, assets);
    this.add(ba);
  }
}
