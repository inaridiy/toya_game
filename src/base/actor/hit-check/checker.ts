import { Circle, Line, Rectangle } from '../shape';
import { Vec2 } from '../../vector/vec';

export const hitCheckOfCircles = (
  circleShape: Circle,
  otherCircle: Circle
): boolean => {
  const result =
    circleShape.getDistance(otherCircle) <=
    circleShape.radius + otherCircle.radius;
  return result;
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

export const hitCheckOfCicleAndRectangle = (
  circle: Circle,
  rectangle: Rectangle
): boolean => {
  const rectHitBox = new Rectangle(
    rectangle.x,
    rectangle.y,
    rectangle.width + circle.radius * 2,
    rectangle.height + circle.radius * 2
  );
  const result = rectHitBox.isInside(circle) ? true : false; //めんどいので円を正方形として計算
  return result;
};
