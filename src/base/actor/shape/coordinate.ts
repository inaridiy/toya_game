export class Coordinate {
  constructor(public x: number, public y: number) {}
  public getDistance(other: Coordinate): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }
}
