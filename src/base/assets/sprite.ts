import { Rectangle } from '../actor/shape';

export class Sprite {
  constructor(public image: HTMLImageElement, public rect: Rectangle) {}
  static get(img: HTMLImageElement) {
    return new Sprite(img, new Rectangle(0, 0, img.width, img.height));
  }
}
