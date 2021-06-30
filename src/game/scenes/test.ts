import { Scene } from '../../base/game/scene';
import { Player } from '../player';
import { AssetManager } from '../../base/assets/asset-loader';
import { TestMob } from '../enemy/test';

export class Test extends Scene {
  constructor(assets: AssetManager) {
    super();
    const player = new Player(300, 300, assets, 10);
    this.add(player);

    this.add(new TestMob(300, 100, assets));
    this.add(new TestMob(500, 300, assets));
    this.add(new TestMob(400, 100, assets));
  }
}
