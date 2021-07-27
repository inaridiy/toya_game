import { Shapes, Circle, Line, Rect } from '.';
import { Vec2 } from './vector';

export const hitCheckOfCircles = (circle: Circle, other: Circle): boolean => {
  const result = circle.getDistance(other) <= circle.radius + other.radius;
  return result;
};

export const hitCheckOfRects = (rect: Rect, other: Rect): boolean => {
  const [xDistance, yDistance] = [
    Math.abs(rect.x - other.x),
    Math.abs(rect.y - other.y),
  ];
  const [xSum, ySum] = [
    (rect.width + other.width) / 2,
    (rect.height + other.height) / 2,
  ];

  return xDistance <= xSum && yDistance <= ySum;
};
export const hitCheckOfCicleAndLine = (circle: Circle, line: Line): boolean => {
  //参考 https://yttm-work.jp/collision/collision_0006.html
  const startToCenter = new Vec2(
    circle.x - line.startPoint.x,
    circle.y - line.startPoint.y
  );
  const endToCenter = new Vec2(
    circle.x - line.endPoint.x,
    circle.y - line.endPoint.y
  );
  const startToEnd = new Vec2(
    line.startPoint.x - line.endPoint.x,
    line.startPoint.y - line.endPoint.y
  );

  const distanceProjection = Vec2.cross(startToCenter, startToEnd.normalized);

  const result = ((): boolean => {
    if (Math.abs(distanceProjection) < circle.radius) {
      const dot1 = Vec2.dot(startToEnd, startToCenter);
      const dot2 = Vec2.dot(endToCenter, startToEnd);
      if (dot1 * dot2 <= 0) {
        return true;
      } else {
        if (
          circle.getDistance(line.startPoint) < circle.radius ||
          circle.getDistance(line.endPoint) < circle.radius
        ) {
          return true;
        }
      }
    }
    return false;
  })();

  return result;
};

export const hitCheckOfCicleAndRect = (circle: Circle, rect: Rect): boolean => {
  const rectHitBox = new Rect(
    rect.x,
    rect.y,
    rect.width + circle.radius * 2,
    rect.height + circle.radius * 2
  );
  const result = rectHitBox.isInside(circle) ? true : false; //めんどいので円を正方形として計算
  return result;
};

export class hitTest {
  static test(shape: Shapes, other: Shapes): boolean {
    const result = (() => {
      if (shape.type === 'circle') {
        return other.type === 'circle'
          ? hitCheckOfCircles(shape, other)
          : other.type === 'line'
          ? hitCheckOfCicleAndLine(shape, other)
          : other.type === 'rect'
          ? hitCheckOfCicleAndRect(shape, other)
          : false;
      } else if (shape.type === 'line') {
        return other.type === 'circle'
          ? hitCheckOfCicleAndLine(other, shape)
          : false; //円以外との判定はしない
      } else if (shape.type === 'rect') {
        return other.type === 'circle'
          ? hitCheckOfCicleAndRect(other, shape)
          : other.type === 'rect'
          ? hitCheckOfRects(shape, other)
          : false;
      } else {
        return false;
      }
    })();
    return result;
  }
}
