import { Circle } from '../shape/circle';

export const hitCheckOfCircle = (
  circleShape: Circle,
  otherCircle: Circle
): boolean => {
  const result =
    circleShape.getDistance(otherCircle) <=
    circleShape.radius + otherCircle.radius;
  return result;
};
