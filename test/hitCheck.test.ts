import { Coord, Line, Circle, Rect, None } from '../src/engine/util/shape';
import {
  hitCheckOfCircles,
  hitCheckOfRects,
  hitCheckOfCircleAndLine,
} from '../src/engine/util/shape';

describe('当たり判定のテスト', () => {
  const circle1 = new Circle(3, 4, 5);
  const circle2 = new Circle(9, 12, 5);
  const circle3 = new Circle(7, 9, 1);

  const rect1 = new Rect(12, 3, 10, 20);
  const rect2 = new Rect(11, 10, 20, 10);
  const rect3 = new Rect(-10, 3, 10, 10);

  const line1 = new Line(5, 7, 100, 90);
  const line2 = new Line(8, 10, 10, 0);
  test('円と円', () => {
    expect(hitCheckOfCircles(circle1, circle2)).toBe(true);
    expect(hitCheckOfCircles(circle1, circle3)).toBe(false);
  });
  test('矩形と矩形', () => {
    expect(hitCheckOfRects(rect1, rect2)).toBe(true);
    expect(hitCheckOfRects(rect1, rect3)).toBe(false);
  });
  test('円と線分', () => {
    expect(hitCheckOfCircleAndLine(circle1, line1)).toBe(true);
    expect(hitCheckOfCircleAndLine(circle1, line2)).toBe(false);
  });
});
