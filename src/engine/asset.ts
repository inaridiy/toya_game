import { Rect } from './shape';

type LoadPromise = Promise<void>;
export type assetMap = Map<string, HTMLImageElement>;
export type setSpriteFunc = (assets: AssetManager) => Sprite;

export class AssetManager {
  constructor(
    public basePath: string,
    public fontsPath: string,
    public videoPath: string
  ) {}
  private _promises: LoadPromise[] = [];
  private _assets: assetMap = new Map();
  private _sprites: Map<string, Sprite> = new Map();
  private _spriteFuncs: Map<string, setSpriteFunc> = new Map();
  private _videos: Map<string, HTMLVideoElement> = new Map();

  addImages(images: { name: string; url: string }[]): AssetManager {
    images.forEach(({ name, url }) => this.addImage(name, url));
    return this;
  }

  addImage(name: string, url: string): AssetManager {
    const img = new Image();
    img.src = this.basePath + url;

    const promise: LoadPromise = new Promise((resolve, reject) => {
      img.addEventListener('load', () => {
        this._assets.set(name, img);
        resolve();
      });
      img.addEventListener('error', (e) => reject(e));
    });
    this._promises.push(promise);
    return this;
  }

  addSprite(name: string, func: setSpriteFunc): void {
    this._spriteFuncs.set(name, func);
  }
  addFonts(fonts: { family: string; source: string }[]): AssetManager {
    fonts.forEach((fontData): void => {
      const obj = new FontFace(
        fontData.family,
        `url('${this.fontsPath}${fontData.source}')`
      );
      const promise: LoadPromise = new Promise((resolve, reject) => {
        obj
          .load()
          .then((loadedFont) => {
            document.fonts.add(loadedFont);
            resolve();
          })
          .catch((e) => reject(e));
      });
      this._promises.push(promise);
    });
    return this;
  }
  addVideo(name: string, path: string): AssetManager {
    const video = document.createElement('video');
    video.src = `${this.videoPath}${path}`;
    const promise: Promise<void> = new Promise((resolve, reject) => {
      video.addEventListener('canplay', () => {
        this._videos.set(name, video);

        resolve();
      });
      video.addEventListener('error', reject);
    });
    this._promises.push(promise);
    return this;
  }

  loadAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      Promise.all(this._promises)
        .then(() => {
          this.loadAllsprite();
          resolve();
        })
        .catch((e) => {
          reject(e);
        });
    });
  }
  loadAllsprite(): void {
    this._spriteFuncs.forEach((value, key) => {
      const sprite = value(this);
      this._sprites.set(key, sprite);
    });
  }
  get getAll(): assetMap {
    return this._assets;
  }
  get(name: string): HTMLImageElement {
    return this._assets.get(name) as HTMLImageElement;
  }
  video(name: string): Sprite<HTMLVideoElement> {
    const video = this._videos.get(name) as HTMLVideoElement;
    if (!video) {
      console.error(`videoネーム ${name} が見つかりません`);
    }
    const sprite = new Sprite<HTMLVideoElement>(
      video,
      Rect.upperLeft(0, 0, video.width, video.height)
    );
    return sprite;
  }
  sprite(name: string): Sprite {
    const sprite = this._sprites.get(name) || Sprite.get(this.get(name));
    return sprite;
  }
}

export class Sprite<T = HTMLImageElement> {
  constructor(public image: T, public rect: Rect) {}
  static get(img: HTMLImageElement): Sprite {
    return new Sprite(img, Rect.upperLeft(0, 0, img.width, img.height));
  }
}

export const drawSprite = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  sprite: Sprite | Sprite<HTMLVideoElement>,
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
    sprite.rect.lx,
    sprite.rect.ty,
    sprite.rect.width,
    sprite.rect.height,
    -width / 2,
    -height / 2,
    width,
    height
  );
  ctx.restore();
};
