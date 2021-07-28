import { AssetManager } from '../engine/asset';
import { font } from '../const';

export const assets = new AssetManager('/static/img/', font.fontPath);

export const loadAssets = (): Promise<void> => {
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
