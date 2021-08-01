import { stageRect } from '../../../const';
import { Actor } from '../../../engine/actor';
import { None } from '../../../engine/shape';

import { YugaminA, YugaminB } from './enemy';

export class FormationA extends Actor {
  constructor(x: number, y: number, public mode: 0 | 1 | 2) {
    super(x, y, new None(0, 0), [], stageRect);
  }
  count = 0;
  update(): void {
    if (this.count % 30 === 0) {
      this.spawnActor(new YugaminA(this.x, this.y, this.mode));
    }
    if (this.count > 300) {
      this.destroy();
    }
    this.count++;
  }
}

export class FormationB extends Actor {
  constructor(x: number, y: number, public mode: 0 | 1 | 2) {
    super(x, y, new None(0, 0), [], stageRect);
  }
  count = 0;
  update(): void {
    if (this.count % 30 === 0) {
      this.spawnActor(new YugaminB(this.x, this.y, this.mode));
    }
    if (this.count > 300) {
      this.destroy();
    }
    this.count++;
  }
}
