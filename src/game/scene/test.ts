import { AssetManager } from '../../engine/asset';
import { Scene } from '../../engine/game/scene';
import { Player } from '../player';

export class Test extends Scene {
  constructor(assets: AssetManager) {
    super();
    const player = new Player(300, 300, assets);
    this.add(player);
  }
}
