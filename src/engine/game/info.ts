import { Rect } from '../shape';
import { Scene } from './scene';

export class GameInfo {
  constructor(
    public screenRect: Rect,
    public currentScene: Scene,
    public count: number
  ) {}
}
