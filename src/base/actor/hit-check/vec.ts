export class Vec2 {
  constructor(public x: number, public y: number) {}
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
  get inverse(): Vec2 {
    return this.clone().times(-1);
  }
}
