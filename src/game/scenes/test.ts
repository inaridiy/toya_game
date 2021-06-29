import { Scene } from '../../base/game/scene';
import { Player } from '../player';
import { AssetManager } from '../../base/assets/asset-loader';
import { TestMob, TestMob2 } from '../enemy/test';

export class Test extends Scene {
  constructor(assets: AssetManager) {
    super();
    const player = new Player(300, 300, assets, 10);
    this.add(player);

    const mob = new TestMob(300, 100, assets);
    this.add(mob);

    const mob2 = new TestMob2(300, 100, assets);
    this.add(mob2);
  }
}
