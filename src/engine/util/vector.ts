import { toRad } from './shape/const';

export class Vec2 {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public x: number;
  public y: number;

  set(x: number, y: number): this {
    this.x = x;
    this.y = y;

    return this;
  }
  clone(): Vec2 {
    return new Vec2(this.x, this.y);
  }
  add(otherVec2: Vec2): this {
    this.x += otherVec2.x;
    this.y += otherVec2.y;
    return this;
  }
  sub(otherVec2: Vec2): this {
    this.x -= otherVec2.x;
    this.y -= otherVec2.y;
    return this;
  }
  times(num: number): this {
    this.x *= num;
    this.y *= num;
    return this;
  }
  setMagnitude(num: number): Vec2 {
    const { x, y, magnitude } = this;
    return magnitude === 0
      ? this
      : new Vec2(x / (magnitude / num), y / (magnitude / num));
  }

  get inverse(): Vec2 {
    return this.clone().times(-1);
  }
  get magnitude(): number {
    const { x, y } = this;
    return Math.sqrt(x ** 2 + y ** 2);
  }
  get normalized(): Vec2 {
    const { x, y, magnitude } = this;
    return magnitude === 0 ? this : new Vec2(x / magnitude, y / magnitude);
  }
  get reverseY(): Vec2 {
    this.y *= -1;
    return this;
  }
  get angle(): number {
    return Math.atan2(this.y, this.x);
  }

  static add(v1: Vec2, v2: Vec2): Vec2 {
    return v1.clone().add(v2);
  }
  static sub(v1: Vec2, v2: Vec2): Vec2 {
    return v1.clone().sub(v2);
  }

  static times(v1: Vec2, num: number): Vec2 {
    return v1.clone().times(num);
  }
  static dot(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }
  static cross(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.y - v1.y * v2.x;
  }
  static radian(radian: number): Vec2 {
    return new Vec2(Math.cos(radian), Math.sin(radian));
  }
  static degree(degree: number): Vec2 {
    const radian = degree * toRad;
    return this.radian(radian);
  }
  static setMagnitude(vec: Vec2, num: number): Vec2 {
    const { x, y, magnitude } = vec;
    return magnitude === 0
      ? vec
      : new Vec2(x / (magnitude / num), y / (magnitude / num));
  }
  static fromToVec(c1: Vec2, c2: Vec2): Vec2 {
    return new Vec2(c2.x - c1.x, c2.y - c1.y);
  }
  static isEqual(v1: Vec2, v2: Vec2): boolean {
    return v1.x === v2.x && v1.y === v2.y;
  }
}
