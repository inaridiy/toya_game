import { Shapes } from '../shape';
import {
  hitCheckOfCircles,
  hitCheckOfCicleAndLine,
  hitCheckOfCicleAndRectangle,
} from './checker';

export const hitCheker = (shape: Shapes, other: Shapes): boolean => {
  const result = (() => {
    if (shape.type === 'circle') {
      return other.type === 'circle'
        ? hitCheckOfCircles(shape, other)
        : other.type === 'line'
        ? hitCheckOfCicleAndLine(shape, other)
        : other.type === 'rectangle'
        ? hitCheckOfCicleAndRectangle(shape, other)
        : false;
    } else if (shape.type === 'line') {
      return other.type === 'circle'
        ? hitCheckOfCicleAndLine(other, shape)
        : false; //円以外との判定はしない
    } else if (shape.type === 'rectangle') {
      return other.type === 'circle'
        ? hitCheckOfCicleAndRectangle(other, shape)
        : false; //円以外との判定はしない
    } else {
      return false;
    }
  })();
  return result;
};
