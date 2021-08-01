import { Stage } from '../stage';
import { Player } from '../actor/player';
import { BezierAcotr } from '../actor/test';
import { Power } from '../actor/obj';
import { assets } from '../../assets';
import { RotatingKenmoti } from '../actor/title';
import { YugaminA } from '../actor/enemy/enemy';
import { FormationA, FormationB } from '../actor/enemy/enemies';

export class Test extends Stage {
  constructor() {
    super(assets.get('bgImg'));
    const player = new Player(0, 300, this);
    this.add(player);

    this.add(new FormationA(-200, -500, 2));
    this.add(new FormationB(200, -500, 2));
  }
  count = 0;
  //debug = true;
}
