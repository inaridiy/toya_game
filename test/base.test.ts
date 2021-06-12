import { Coordinate } from '../src/base/form/coordinate';

test('ゲッターのテスト', () => {
  expect(new Coordinate(5, 6).getCoordinate).toEqual({ x: 5, y: 6 });
});

test('距離測定関数のテスト', () => {
  const coA = new Coordinate(5, 6);
  expect(new Coordinate(5, 6).getDistance(coA)).toBe(0);
  expect(new Coordinate(5, 7).getDistance(coA)).toBe(1);
  expect(new Coordinate(8, 10).getDistance(coA)).toBe(5);
  expect(new Coordinate(2, 2).getDistance(coA)).toBe(5);
});
