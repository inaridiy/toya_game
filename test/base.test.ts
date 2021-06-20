import { Coordinate } from '../src/base/actor/shape/coordinate';

test('距離測定関数のテスト', () => {
  const coA = new Coordinate(5, 6);
  expect(new Coordinate(5, 6).getDistance(coA)).toBe(0);
  expect(new Coordinate(5, 7).getDistance(coA)).toBe(1);
  expect(new Coordinate(8, 10).getDistance(coA)).toBe(5);
  expect(new Coordinate(2, 2).getDistance(coA)).toBe(5);
});

import { Line, Circle, Rectangle } from '../src/base/actor/shape/index';

test('Lineクラスの始点終点取得テスト', () => {
  const LineA = new Line(3, 4, 10, 30);
  expect(LineA.startPoint.getDistance(LineA.endPoint)).toBe(10);
});

import { hitCheckOfCicleAndLine } from '../src/base/actor/hit-check/checker';

test('線分と円の当たり判定', () => {
  const lineA = new Line(3, 4, 10, 30);
  const circleA = new Circle(3, 5, 5);
  expect(hitCheckOfCicleAndLine(circleA, lineA)).toBe(true);

  const lineB = new Line(3, 4, 10, 0);
  const circleB = new Circle(3, 10, 5);
  expect(hitCheckOfCicleAndLine(circleB, lineB)).toBe(false);

  const lineC = new Line(3, 4, 20, 88);
  const circleC = new Circle(3, 10, 5);
  expect(hitCheckOfCicleAndLine(circleC, lineC)).toBe(true);
});

test('矩形と点の当たり判定', () => {
  const rect = new Rectangle(3, 4, 5, 10);

  expect(rect.isInside(new Coordinate(3, 4))).toBe(true);
  expect(rect.isInside(new Coordinate(10, 2))).toBe(false);
});
