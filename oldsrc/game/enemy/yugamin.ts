import { SpriteActor } from '../../base/actor/index';
class Yugamin extends SpriteActor {
  constructor(
    x: number,
    y: number,
    radius: number,
    tags: string[] | undefined,
    sprite: HTMLImageElement,
    width: number
  ) {
    super(x, y, radius, tags, sprite, width);
  }
}
