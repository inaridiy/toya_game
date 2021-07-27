import { Coord, Rect } from './engine/shape';

export type typeSprite = { name: string; width: number; rotate: number };

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

export type typeStageObj = {
  incr: number;
  hitSize: number;
  sprite: typeSprite;
  maxInitSpeed: number;
  minInitSpeed: number;
  maxSpeed: number;
  gravity: number;
};
export type typePowerObjs = { normal: typeStageObj; large: typeStageObj };
export type typeStageObjs = { power: typePowerObjs };

export const stageObj: typeStageObjs = {
  power: {
    normal: {
      incr: 1,
      hitSize: 20,
      maxInitSpeed: 12,
      minInitSpeed: 4,
      maxSpeed: 8,
      gravity: 0.5,
      sprite: { name: 'power', width: 30, rotate: 0 },
    },
    large: {
      incr: 10,
      hitSize: 30,
      maxInitSpeed: 5,
      minInitSpeed: 0,
      maxSpeed: 6,
      gravity: 0.3,
      sprite: { name: 'power', width: 50, rotate: 0 },
    },
  },
};

export const ui = {
  info: {
    power: {
      x: 800,
      y: 500,
      margin: 50,
      text: 'Power',
      font: '60px OtomanopeeOne',
      fillStyle: 'black',
    },
    life: {
      x: 800,
      y: 600,
      margin: 50,
      text: 'Life',
      font: '60px OtomanopeeOne',
      fillStyle: 'black',
      sprite: { name: 'kimoi', width: 70, rotate: 0 },
    },
    bomb: {
      x: 800,
      y: 700,
      margin: 50,
      text: 'Bomb',
      font: '60px OtomanopeeOne',
      fillStyle: 'black',
      sprite: { name: 'kimoi', width: 70, rotate: 0 },
    },
  },
};

export const playerConf = {
  hitSize: 30,
  speed: 10,
  maxPower: 120,
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
      slow: { coord: new Coord(0, -100), angle: 105 },
    },
    right: {
      normal: { coord: new Coord(100, 0), angle: 60 },
      slow: { coord: new Coord(0, -100), angle: 75 },
    },
    sprite: { name: 'ago', width: 30, rotate: -90 },
  },
};
