import { AssetManager } from '../../engine/asset';
import { Scene } from '../../engine/game/scene';
import { Player } from '../actor/player';
import { BezierAcotr } from '../actor/test';

export class Test extends Scene {
  constructor(assets: AssetManager) {
    super();
    const player = new Player(300, 300, assets);
    this.add(player);

    const ba = new BezierAcotr(100, 100, assets);
    this.add(ba);
  }
}
