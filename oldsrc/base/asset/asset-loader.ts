type AssetsMap = Map<string, HTMLImageElement>;
type ImagePromise = Promise<HTMLImageElement>;

export class AssetLoader {
  private _promises: ImagePromise[] = [];
  private _assets: AssetsMap = new Map();

  addImage(name: string, url: string): void {
    const img = new Image();
    img.src = url;

    const promise: ImagePromise = new Promise((resolve, reject) => {
      img.addEventListener('load', () => {
        this._assets.set(name, img);
        resolve(img);
      });
      img.addEventListener('error', (e) => {
        reject(e);
      });

      this._promises.push(promise);
    });
  }
  loadAll(): Promise<HTMLImageElement[]> {
    return Promise.all(this._promises);
  }

  getImage(name: string): HTMLImageElement {
    return <HTMLImageElement>this._assets.get(name);
  }
}
