import { Coord, Line, Circle, Rect, None } from '../src/engine/util/shape';

describe('形状のテスト', () => {
  describe('Coordのテスト', () => {
    const c1 = new Coord(3, 4);
    const c2 = new Coord(6, 8);
    test('constructorのテスト', () => {
      expect(c1).toEqual({ x: 3, y: 4 });
    });
    test('getDistanceのテスト', () => {
      expect(c1.getDistance(c2)).toBe(5);
    });
    test('addのテスト', () => {
      expect(Coord.add(c1, c2)).toEqual(new Coord(9, 12));
    });
  });
  describe('Circleのテスト', () => {
    const circle = new Circle(5, 8, 3);
    const coord = new Coord(6, 7);
    const coord2 = new Coord(100, 200);
    test('constructorのテスト', () => {
      expect(circle).toEqual({ x: 5, y: 8, radius: 3, type: 'circle' });
    });
    test('isInsideのテスト', () => {
      expect(circle.isInside(coord)).toBe(true);
      expect(circle.isInside(coord2)).toBe(false);
    });
    test('cloneShapeのテスト', () => {
      expect(circle.cloneShape()).toEqual(circle);
    });
  });
  describe('Lineのテスト', () => {
    const l1 = new Line(3, 4, 10, 45);
    const coord = new Coord(5, 6);
    const coord2 = new Coord(1, 323);
    const t = Math.PI / 4;
    test('constructorのテスト', () => {
      expect(l1).toEqual({
        x: 3,
        y: 4,
        length: 10,
        halfOfLength: 5,
        slope: 45 * (Math.PI / 180),
        type: 'line',
      });
    });
    test('startPointのテスト', () => {
      expect(l1.startPoint).toEqual(
        Coord.add(l1, new Coord(5 * Math.cos(t), 5 * Math.sin(t)))
      );
    });
    test('endPointのテスト', () => {
      expect(l1.endPoint).toEqual(
        Coord.sub(l1, new Coord(5 * Math.cos(t), 5 * Math.sin(t)))
      );
    });
    test('isInsideのテスト', () => {
      expect(l1.isInside(coord)).toBe(true);
      expect(l1.isInside(coord2)).toBe(false);
    });
    test('cloneShapeのテスト', () => {
      expect(l1.cloneShape()).toEqual(l1);
    });
  });
  describe('Rect', () => {
    const rect = new Rect(10, 5, 10, 20);
    const c1 = new Coord(7, -2);
    const c2 = new Coord(16, 13);
    test('constructorのテスト', () => {
      expect(rect).toEqual({
        x: 10,
        y: 5,
        width: 10,
        height: 20,
        type: 'rect',
      });
    });
    test('upperLeftのテスト', () => {
      const rect2 = Rect.upperLeft(5, -5, 10, 20);
      expect(rect2).toEqual(rect);
    });
    test('isInsideのテスト', () => {
      expect(rect.isInside(c1)).toBe(true);
      expect(rect.isInside(c2)).toBe(false);
    });
    test('expansionのテスト', () => {
      expect(rect.expansion(10)).toEqual(new Rect(10, 5, 20, 30));
      expect(rect.expansion(10, 5)).toEqual(new Rect(10, 5, 20, 25));
    });
    test('cloneShapeのテスト', () => {
      expect(rect.cloneShape()).toEqual(rect);
    });
  });
  describe('Noneのテスト', () => {
    const none = new None(10, 5);
    test('constructorのテスト', () => {
      expect(none).toEqual({ x: 10, y: 5, type: 'none' });
    });
  });
});
