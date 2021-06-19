import { Circle, Line, Rectangle } from '../shape';

export const hitCheckOfCircles = (
  circleShape: Circle,
  otherCircle: Circle
): boolean => {
  const result =
    circleShape.getDistance(otherCircle) <=
    circleShape.radius + otherCircle.radius;
  return result;
};

export const hitCheckOfCicleAndLine = (
  circleShape: Circle,
  LineShape: Line
): boolean => {
  return true;
};
