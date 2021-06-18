export class Sprite {
  public width: number;
  public height: number;
  constructor(public image: HTMLImageElement) {
    this.height = image.height;
    this.width = image.width;
  }
}
