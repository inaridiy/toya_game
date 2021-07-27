import { Rect } from './shape';

type ImagePromise = Promise<HTMLImageElement>;
export type assetMap = Map<string, HTMLImageElement>;

export class AssetManager {
  constructor(public basePath: string) {}
  private _promises: ImagePromise[] = [];
  private _assets: assetMap = new Map();

  addImages(images: { name: string; url: string }[]): AssetManager {
    images.forEach(({ name, url }) => this.addImage(name, url));
    return this;
  }

  addImage(name: string, url: string): AssetManager {
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
    return this;
  }
  loadAll(): Promise<HTMLImageElement[]> {
    return Promise.all(this._promises);
  }
  get getAll(): assetMap {
    return this._assets;
  }
  get(name: string): HTMLImageElement {
    return this._assets.get(name) as HTMLImageElement;
  }
  sprite(name: string): Sprite {
    const image = this.get(name);
    return Sprite.get(image);
  }
}

export class Sprite {
  constructor(public image: HTMLImageElement, public rect: Rect) {}
  static get(img: HTMLImageElement): Sprite {
    return new Sprite(img, new Rect(0, 0, img.width, img.height));
  }
}

export type setSpriteFuncs = { [index: string]: setSpriteFunc };
export type setSpriteFunc = (assets: AssetManager) => Sprite;
export class SpriteManager {
  constructor(public assets: AssetManager) {}
  private _spriteFuncs: setSpriteFuncs = {};
  private _sprites: Map<string, Sprite> = new Map();

  addSprites(obj: setSpriteFuncs): void {
    for (const key in obj) {
      this.addSprite(key, obj[key]);
    }
  }

  addSprite(name: string, func: setSpriteFunc): void {
    this._spriteFuncs[name] = func;
  }

  load(): void {
    for (const key in this._spriteFuncs) {
      this._sprites.set(key, this._spriteFuncs[key](this.assets));
    }
  }
  get(name: string): Sprite {
    const sprite = this._sprites.get(name);
    if (!sprite) {
      return this.assets.sprite(name);
    }
    return sprite;
  }
}

export const drawSprite = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sprite: Sprite,
  width = sprite.rect.width,
  degree = 0
): void => {
  if (sprite === undefined) {
    console.error('スプライトがありません');
    return;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate((degree * Math.PI) / 180);
  const height = (sprite.rect.height * width) / sprite.rect.width;
  ctx.drawImage(
    sprite.image,
    sprite.rect.x,
    sprite.rect.y,
    sprite.rect.width,
    sprite.rect.height,
    -width / 2,
    -height / 2,
    width,
    height
  );
  ctx.restore();
};
