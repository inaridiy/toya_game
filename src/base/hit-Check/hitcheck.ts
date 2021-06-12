import { IShapes } from '../shape/shape';
import { hitCheckOfCircle } from './both-circle';
import { hitCheckOfRectangle } from './both-rectangle';
import { hitCheckOfCircleAndRectangle } from './not-match';

export const hitChecker = (shape: IShapes, other: IShapes) => {
  const result = (() => {
    if (shape.type !== other.type) {
      return shape.type === 'circle'
        ? hitCheckOfCircleAndRectangle(shape, other)
        : hitCheckOfCircleAndRectangle(other, shape);
    } else if (shape.type === other.type) {
      return shape.type === 'circle'
        ? hitCheckOfCircle(shape, other)
        : hitCheckOfRectangle(shape, other);
    }
  })();
  return result;
};
