import { Rect } from './shape';

type ImagePromise = Promise<HTMLImageElement>;
export type assetMap = Map<string, HTMLImageElement>;

export class AssetManager {
  constructor(public basePath: string) {}
  private _promises: ImagePromise[] = [];
  private _assets: assetMap = new Map();

  addImages(images: { name: string; url: string }[]): void {
    images.forEach(({ name, url }) => this.addImage(name, url));
  }

  addImage(name: string, url: string): void {
    const img = new Image();
    img.src = this.basePath + url;

    const promise: ImagePromise = new Promise((resolve, reject) => {
      img.addEventListener('load', () => {
        this._assets.set(name, img);
        resolve(img);
      });
      img.addEventListener('error', (e) => reject(e));
    });
    this._promises.push(promise);
  }
  loadAll(): Promise<HTMLImageElement[]> {
    return Promise.all(this._promises);
  }
  get getAll(): assetMap {
    return this._assets;
  }
  get(name: string): HTMLImageElement {
    return <HTMLImageElement>this._assets.get(name);
  }
}

export class Sprite {
  constructor(public image: HTMLImageElement, public rect: Rect) {}
  static get(img: HTMLImageElement) {
    return new Sprite(img, new Rect(0, 0, img.width, img.height));
  }
}
