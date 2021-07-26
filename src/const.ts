import { Coord, Rect } from './engine/shape';

export const playerImages = [
  { name: 'kubi', url: 'player/namakubi.png' },
  { name: 'sinai', url: 'player/sinai.png' },
  { name: 'ago', url: 'player/ago.png' },
];

export const font = {
  fontPath: '/static/fonts/',
  fonts: [
    { family: 'qahiri', source: 'Qahiri-Regular.ttf' },
    { family: 'OtomanopeeOne', source: 'OtomanopeeOne-Regular.ttf' },
  ],
};

export const size = { x: 1280, y: 960 };

export const stageRect = Rect.upperLeft(30, 30, 600, 900);

export const ui = {
  info: {
    power: {
      x: 500,
      y: 500,
      text: 'Power',
      font: '100px OtomanopeeOne',
      fillStyle: 'black',
    },
    life: {
      x: 500,
      y: 500,
      text: 'Life',
      sprite: { name: 'kimoi', width: '50', rotate: '0' },
    },
    bomb: {
      x: 500,
      y: 500,
      text: 'Bomb',
      sprite: { name: 'kimoi', width: '50', rotate: '0' },
    },
  },
};

export const playerConf = {
  hitSize: 10,
  speed: 10,

  sprite: { name: 'kubi', width: 60, rotate: 180 },

  shotA: {
    interval: 7,
    qtyPerPower: 15,
    speed: 20,
    damage: 5,
    hitSize: 10,
    angleBetween: { normal: 10, slow: 3 },
    sprite: { name: 'sinai', width: 20, rotate: 90 },
  },

  shotB: {
    interval: 10,
    hitSize: 10,
    speed: 15,
    damage: 3,
    curvature: 10,
    trackingLimit: 180,
    angleBetween: { normal: 30, slow: 30 },
    incrTims: [10, 50, 100],
    left: {
      normal: { coord: new Coord(-100, 0), angle: 120 },
      slow: { coord: new Coord(0, -100), angle: 90 },
    },
    right: {
      normal: { coord: new Coord(100, 0), angle: 60 },
      slow: { coord: new Coord(0, -100), angle: 90 },
    },
    sprite: { name: 'ago', width: 30, rotate: -90 },
  },
};
