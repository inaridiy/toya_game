import { AssetManager, SpriteManager } from './engine/asset';
import { font } from './const';

export const assets = new AssetManager('/static/img/');
export const sprites = new SpriteManager(assets);

export const loadAssets = () => {
  return assets
    .addImages(playerImages)
    .addImage('bgImg', 'bg.jpg')
    .addImage('kimoi', 'kimoi.png')
    .addImage('power', 'power.png')
    .loadAll();
};

const playerImages = [
  { name: 'kubi', url: 'player/namakubi.png' },
  { name: 'sinai', url: 'player/sinai.png' },
  { name: 'ago', url: 'player/ago.png' },
];

export const loadFonts = (): Promise<void[]> => {
  const fontPromises = font.fonts.map((fontData): Promise<void> => {
    const obj = new FontFace(
      fontData.family,
      `url('${font.fontPath}${fontData.source}')`
    );
    return new Promise((resolve, reject) => {
      obj
        .load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
          resolve();
        })
        .catch((e) => reject(e));
    });
  });
  return Promise.all(fontPromises);
};
