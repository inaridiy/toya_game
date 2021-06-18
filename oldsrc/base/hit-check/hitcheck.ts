import { Circle } from '../shape/circle';
import { Rectangle } from '../shape/rectangle';
import { Shapes } from '../shape';

import { hitCheckOfCircle } from './both-circle';
import { hitCheckOfRectangle } from './both-rectangle';
import { hitCheckOfCircleAndRectangle } from './not-match';

export const hitChecker = (shape: Shapes, other: Shapes): boolean => {
  const result = (() => {
    if (shape instanceof Circle) {
      return other instanceof Circle
        ? hitCheckOfCircle(shape, other)
        : hitCheckOfCircleAndRectangle(shape, other);
    } else {
      return other instanceof Circle
        ? hitCheckOfCircleAndRectangle(other, shape)
        : hitCheckOfRectangle(shape, other);
    }
  })();
  return result;
};
