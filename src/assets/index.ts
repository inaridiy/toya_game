import { AssetManager } from '../engine/asset';
import { font } from '../const';

export const assets = new AssetManager(
  '/static/img/',
  font.fontPath,
  '/static/video/'
);

export const loadAssets = (): Promise<void> => {
  return assets
    .addImages(playerImages)
    .addImage('bgImg', 'bg.jpg')
    .addImage('kimoi', 'kimoi.png')
    .addImage('power', 'power.png')
    .addFonts(font.fonts)
    .addVideo('master', 'master-spark.mp4')
    .loadAll();
};

const playerImages = [
  { name: 'kubi', url: 'player/namakubi.png' },
  {
    name: 'sinai',
    url: 'player/sinai.png',
    from: 'https://www.irasutoya.com/2015/08/blog-post_673.html',
  },
  { name: 'ago', url: 'player/ago.png' },
  {
    name: 'masp',
    url: 'player/master-spark.png',
    from: 'https://commons.nicovideo.jp/material/nc145066',
  },
];
