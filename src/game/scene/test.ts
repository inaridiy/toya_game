import { AssetManager } from '../../engine/asset';
import { Stage } from '../stage';
import { Player } from '../actor/player';
import { BezierAcotr } from '../actor/test';

export class Test extends Stage {
  constructor(assets: AssetManager) {
    super(assets.get('bgImg'), assets);
    const player = new Player(0, 300, assets, this.stageRect);
    this.add(player);

    const ba = new BezierAcotr(100, 100, assets);
    this.add(ba);
  }
}
