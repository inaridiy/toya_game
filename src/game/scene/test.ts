import { AssetManager } from '../../engine/asset';
import { Stage } from '../stage';
import { Player } from '../actor/player';
import { BezierAcotr } from '../actor/test';
import { Power } from '../actor/obj';

export class Test extends Stage {
  constructor(public assets: AssetManager) {
    super(assets.get('bgImg'), assets);
    const player = new Player(0, 300, assets, this.stageRect);
    this.add(player);

    const ba = new BezierAcotr(100, 100, assets);
    this.add(ba);
    this.add(new Power(0, -400, 'normal', this.assets));
    const spawnPower = () => {
      if (this.count % 20 == 0) {
        this.add(new Power(0, -400, 'normal', this.assets));
      }
      if (this.count % 100 == 0) {
        this.add(new Power(0, -400, 'large', this.assets));
      }
      this.count++;
    };
    this.beforeFuncs.push(spawnPower);
  }
  count = 0;
}
