import { Stage } from '../stage';
import { Player } from '../actor/player';
import { BezierAcotr, VideoActor } from '../actor/test';
import { Power } from '../actor/obj';
import { assets } from '../../assets';

export class Test extends Stage {
  constructor() {
    super(assets.get('bgImg'));
    const player = new Player(0, 300);
    this.add(player);

    const ba = new BezierAcotr(100, 100);
    this.add(ba);

    this.add(new VideoActor());

    this.add(new Power(0, -400, 'normal'));
    const spawnPower = () => {
      if (this.count % 20 == 0) {
        this.add(new Power(0, -400, 'normal'));
      }
      if (this.count % 100 == 0) {
        this.add(new Power(0, -400, 'large'));
      }
      this.count++;
    };
    this.beforeFuncs.push(spawnPower);
  }
  count = 0;
}
