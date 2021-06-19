import { Shapes } from '../shape';
import { hitCheckOfCircles } from './checker';

export const hitCheker = (shape: Shapes, other: Shapes) => {
  const result = (() => {
    if (shape.type === 'circle') {
      return;
    } else if (shape.type === 'line') {
    } else if (shape.type === 'rectangle') {
    } else {
      return false;
    }
  })();
  return result;
};
