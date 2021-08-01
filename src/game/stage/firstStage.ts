import { Stage } from '.';
import { assets } from '../../assets';
import { stageRect } from '../../const';
import { FormationA, FormationB } from '../actor/enemy/enemies';
import { YugaminC, YugaminD } from '../actor/enemy/enemy';
import { Player } from '../actor/player';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class FirstStage extends Stage {
  constructor(public mode: 0 | 1 | 2 = 1) {
    super(assets.get('bgImg'));

    void this.timeLine();
  }
  async timeLine(): Promise<void> {
    await sleep(5000);
    this.add(new FormationA(-200, -500, this.mode));
    await sleep(8000);
    this.add(new FormationB(200, -500, this.mode));
    await sleep(8000);
    this.add(new YugaminC(-350, -300, this.mode, stageRect));
    this.add(new YugaminD(350, -100, this.mode, stageRect));
    await sleep(1000);
    this.add(new YugaminC(-350, -100, this.mode, stageRect));
    this.add(new YugaminD(350, -300, this.mode, stageRect));
    await sleep(1000);
    this.add(new YugaminC(-350, -350, this.mode, stageRect));
    this.add(new YugaminD(350, -150, this.mode, stageRect));
    this.add(new YugaminC(-350, -100, this.mode, stageRect));
    this.add(new YugaminD(350, -300, this.mode, stageRect));
    await sleep(4000);
    this.add(new FormationA(-200, -500, this.mode));
    this.add(new FormationB(200, -500, this.mode));
    await sleep(1000);
    this.add(new YugaminC(-350, -300, this.mode, stageRect));
    this.add(new YugaminD(350, -100, this.mode, stageRect));
    await sleep(6000);
    this.add(new FormationA(-250, -500, this.mode));
    this.add(new FormationA(-200, -450, this.mode));
  }
}
