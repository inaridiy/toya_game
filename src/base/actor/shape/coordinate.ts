export class Coordinate {
  constructor(public x: number, public y: number) {}
  public getDistance(other: Coordinate): number {
    return Math.sqrt(
      Math.abs(other.x - this.x) ** 2 + Math.abs(other.y - this.y) ** 2
    );
  }
}
