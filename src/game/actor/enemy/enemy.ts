import { assets } from '../../../assets';
import { enemy, typeEnemy, typeSprite } from '../../../const';
import { SpriteActor } from '../../../engine/actor';
import { Sprite } from '../../../engine/asset';
import { updateObj } from '../../../engine/game/scene';
import { Coord, Rect } from '../../../engine/shape';
import { Bezier } from '../../../engine/shape/bezier';
import { Power } from '../obj';
import { PlayerBullet } from '../player/player-bullet';
import { EnemyShotA, EnemyShotB } from './enemy-shot';

const { yugaminA, yugaminB, yugaminC, yugaminD } = enemy;

export abstract class Enemy extends SpriteActor {
  constructor(coord: Coord, public life: number, stageRect?: Rect) {
    super(
      coord.x,
      coord.y,
      new Rect(coord.x, coord.y, 50, 100),
      ['enemy'],
      stageRect
    );
    this.addEventListener('hit', (e) => {
      if (e.target.hasTag('playerBullet')) {
        const enemy = e.target as PlayerBullet;
        this.life -= enemy.damage;
      }
    });
  }
}

export class EnemyCreatebyConfig extends Enemy {
  constructor(coord: Coord, config: typeEnemy, stageRect?: Rect) {
    super(coord, config.life, stageRect);
    const { bezier: b } = config;
    this.bezier = new Bezier(
      this.coord,
      new Coord(this.coord.x + b[0].x, this.coord.y + b[0].y),
      new Coord(this.coord.x + b[1].x, this.coord.y + b[1].y),
      new Coord(this.coord.x + b[2].x, this.coord.y + b[2].y)
    );
    this.actions = config.actions;
    this.tPerF = 1 / config.moveTime;
    this.sprite = assets.sprite(config.sprite.name);
    this.spriteData = config.sprite;
  }
  bezier: Bezier;
  action: () => void = () => {
    false;
  };
  actions: number[];
  tPerF: number;
  sprite: Sprite;
  spriteData: typeSprite;
  count = 0;

  update({ ctx }: updateObj): void {
    if (this.life <= 0) {
      const random = Math.random();
      if (random <= 0.1) {
        this.spawnActor(new Power(this.x, this.y, 'normal'));
      } else if (random >= 0.95) {
        this.spawnActor(new Power(this.x, this.y, 'large'));
      }
      this.destroy();
    }

    this.coord = this.bezier.getCoord(this.count * this.tPerF);
    if (this.actions.includes(this.count)) {
      this.action();
    }

    this.render(ctx);
    this.count++;
  }
  render(ctx: CanvasRenderingContext2D): void {
    this.drawSprite(
      ctx,
      this.sprite,
      this.spriteData.width,
      this.spriteData.rotate
    );
  }
}

export class YugaminA extends EnemyCreatebyConfig {
  constructor(x: number, y: number, mode: 0 | 1 | 2, stageRect?: Rect) {
    super(new Coord(x, y), yugaminA, stageRect);
    this.action = () => {
      this.spawnActor(new EnemyShotA(this.coord, mode));
    };
  }
}

export class YugaminB extends EnemyCreatebyConfig {
  constructor(x: number, y: number, mode: 0 | 1 | 2, stageRect?: Rect) {
    super(new Coord(x, y), yugaminB, stageRect);
    this.action = () => {
      this.spawnActor(new EnemyShotB(this.coord, mode));
    };
  }
}

export class YugaminC extends EnemyCreatebyConfig {
  constructor(x: number, y: number, mode: 0 | 1 | 2, stageRect?: Rect) {
    super(new Coord(x, y), yugaminC, stageRect);
    this.action = () => {
      this.spawnActor(new EnemyShotA(this.coord, mode));
    };
  }
}

export class YugaminD extends EnemyCreatebyConfig {
  constructor(x: number, y: number, mode: 0 | 1 | 2, stageRect?: Rect) {
    super(new Coord(x, y), yugaminD, stageRect);
    this.action = () => {
      this.spawnActor(new EnemyShotB(this.coord, mode));
    };
  }
}
