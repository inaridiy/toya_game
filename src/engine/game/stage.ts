import { stageRect } from '../../const';
import { Scene } from './scene';

export class Stage extends Scene {
  constructor() {
    super();
  }

  public stageRect = stageRect;
  public debug = false;
}
