import { Actor } from './engine/actor';
import { Circle, Coord, Rect } from './engine/shape';

export type typeSprite = { name: string; width: number; rotate?: number };

export const font = {
  fontPath: '/static/fonts/',
  fonts: [
    { family: 'qahiri', source: 'Qahiri-Regular.ttf' },
    { family: 'OtomanopeeOne', source: 'OtomanopeeOne-Regular.ttf' },
  ],
};

export const size = { x: 1280, y: 960 };

export const screenRect = Rect.upperLeft(0, 0, size.x, size.y);
export const stageRect = Rect.upperLeft(30, 30, 600, 900);
export const deletaRect = stageRect.expansion(400);

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
      maxInitSpeed: 6,
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
  hitSize: 20,
  speed: 10,
  maxPower: 120,
  bombInterval: 1000,
  sprite: { name: 'kubi', width: 60, rotate: 180 },

  shotA: {
    interval: 7,
    qtyPerPower: 15,
    speed: 20,
    damage: 3,
    hitSize: 10,
    angleBetween: { normal: 10, slow: 2 },
    sprite: { name: 'sinai', width: 20, rotate: 90 },
  },

  shotB: {
    interval: 10,
    hitSize: 10,
    speed: 15,
    damage: 1,
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

  bombA: {
    duration: 1000,
    damage: 999,
    sprite: { name: 'masp', width: 70, rotate: 0 },
  },
};

export type typeEnemy = {
  life: number;
  moveTime: number;
  bezier: { x: number; y: number }[];
  actions: number[];
  sprite: typeSprite;
};
export const enemy: { [k in string]: typeEnemy } = {
  yugaminA: {
    life: 10,
    moveTime: 300,
    bezier: [
      { x: 0, y: 250 },
      { x: 200, y: 350 },
      { x: 600, y: 400 },
    ],
    actions: [100, 200],
    sprite: { name: 'redY', width: 100 },
  },
  yugaminB: {
    life: 10,
    moveTime: 300,
    bezier: [
      { x: 0, y: 250 },
      { x: -200, y: 350 },
      { x: -600, y: 400 },
    ],
    actions: [100, 200],
    sprite: { name: 'greenY', width: 100 },
  },
  yugaminC: {
    life: 10,
    moveTime: 200,
    bezier: [
      { x: 200, y: 100 },
      { x: 200, y: 100 },
      { x: 0, y: 200 },
    ],
    actions: [100],
    sprite: { name: 'blackY', width: 100 },
  },
  yugaminD: {
    life: 10,
    moveTime: 200,
    bezier: [
      { x: -300, y: 100 },
      { x: -300, y: 100 },
      { x: 0, y: 200 },
    ],
    actions: [100],
    sprite: { name: 'yellowY', width: 100 },
  },
};

export const enemyShot = {
  shotA: {
    sprite: { name: 'blueB', width: 40 },
    speed: 7,
    hitSize: 15,
    0: { qty: 3 },
    1: { qty: 5 },
    2: { qty: 7 },
  },
  shotB: {
    sprite: { name: 'redB', width: 40 },
    speed: 5,
    hitSize: 15,
    0: { qty: 3 },
    1: { qty: 5 },
    2: { qty: 7 },
  },
};
