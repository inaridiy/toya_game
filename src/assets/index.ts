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
    .addImages([...yugamins, ...bullet])
    .addImage('bgImg', 'bg.jpg')
    .addImage('kimoi', 'kimoi.png')
    .addImage('power', 'power.png')
    .addImage('dasai', 'dasai.png')
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

const yugamins = [
  { name: 'blackY', url: 'enemy/black-yugamin.png' },
  { name: 'yellowY', url: 'enemy/yellow-yugamin.png' },
  { name: 'greenY', url: 'enemy/green-yugamin.png' },
  { name: 'redY', url: 'enemy/red-yugamin.png' },
  { name: 'normalY', url: 'enemy/yugamin.png' },
  { name: 'trueY', url: 'enemy/true-black-yugamin.png' },
];

const bullet = [
  { name: 'blueB', url: 'bullet/blue-bullet.png' },
  { name: 'redB', url: 'bullet/red-bullet.png' },
];
