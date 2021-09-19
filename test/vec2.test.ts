import { Coord } from '../src/engine/util/shape';
import { Vec2 } from '../src/engine/util/vector';

describe('vector2のテスト', () => {
  test('constructorのテスト', () => {
    const v1 = new Vec2(0, 0);
    expect(v1.x).toBe(0);
    expect(v1.y).toBe(0);

    const v2 = new Vec2(1, 10000);
    expect(v2.x).toBe(1);
    expect(v2.y).toBe(10000);
  });

  test('setのテスト', () => {
    const baseVec = new Vec2(100, 100);
    baseVec.set(200, 500);
    expect(baseVec.x).toBe(200);
    expect(baseVec.y).toBe(500);
  });

  test('cloneのテスト', () => {
    const baseVec = new Vec2(300, 200);
    const cloneVec = baseVec.clone();
    expect(baseVec).toEqual(cloneVec);
  });

  test('addのテスト', () => {
    const v1 = new Vec2(100, 200);
    const v2 = new Vec2(300, 400);
    expect(v1.add(v2)).toEqual(new Vec2(400, 600));

    const v3 = new Vec2(400, 500);
    const v4 = new Vec2(500, 600);
    expect(Vec2.add(v3, v4)).toEqual(new Vec2(900, 1100));
  });

  test('subのテスト', () => {
    const v1 = new Vec2(100, 200);
    const v2 = new Vec2(300, 400);
    expect(v1.sub(v2)).toEqual(new Vec2(-200, -200));

    const v3 = new Vec2(400, 500);
    const v4 = new Vec2(500, 600);
    expect(Vec2.sub(v4, v3)).toEqual(new Vec2(100, 100));
  });

  test('timesのテスト', () => {
    const v1 = new Vec2(100, 200);
    expect(v1.times(3)).toEqual(new Vec2(300, 600));

    const v2 = new Vec2(300, 400);
    expect(Vec2.times(v2, 5)).toEqual(new Vec2(1500, 2000));
  });

  test('setMagnitudeのテスト', () => {
    const v1 = new Vec2(300, 400);
    expect(v1.setMagnitude(5)).toEqual(new Vec2(3, 4));

    const v2 = new Vec2(500, 1200);
    expect(Vec2.setMagnitude(v2, 26)).toEqual(new Vec2(10, 24));

    const v3 = new Vec2(0, 0);
    expect(v3.setMagnitude(100)).toEqual(new Vec2(0, 0));

    const v4 = new Vec2(0, 0);
    expect(Vec2.setMagnitude(v4, 10000)).toEqual(new Vec2(0, 0));
  });

  test('inverseのテスト', () => {
    const v1 = new Vec2(100, 200);
    expect(v1.inverse).toEqual(new Vec2(-100, -200));
  });

  test('magnitudeのテスト', () => {
    const v1 = new Vec2(300, 400);
    expect(v1.magnitude).toBe(500);
  });

  test('normalizeのテスト', () => {
    const v1 = new Vec2(300, 400);
    expect(v1.normalized).toEqual(new Vec2(0.6, 0.8));

    const v2 = new Vec2(0, 0);
    expect(v2.normalized).toEqual(new Vec2(0, 0));
  });

  test('reverseYのテスト', () => {
    const v1 = new Vec2(300, 400);
    expect(v1.reverseY).toEqual(new Vec2(300, -400));
  });

  test('angleのテスト', () => {
    const v1 = new Vec2(400, 400);
    expect(v1.angle).toBe(Math.PI / 4);

    const v2 = new Vec2(0, 200);
    expect(v2.angle).toBe(Math.PI / 2);
  });

  test('degreeのテスト', () => {
    const degree = 45;
    expect(Vec2.degree(degree).angle).toBe(Math.PI / 4);
  });

  test('dotのテスト', () => {
    const v1 = new Vec2(100, 200);
    const v2 = new Vec2(300, 400);
    expect(Vec2.dot(v1, v2)).toBe(110000);
  });
  test('crossのテスト', () => {
    const v1 = new Vec2(100, 200);
    const v2 = new Vec2(300, 400);
    expect(Vec2.cross(v1, v2)).toBe(-20000);
  });
  test('fromToVecのテスト', () => {
    const c1 = new Coord(3, 4);
    const c2 = new Coord(10, 15);
    expect(Vec2.fromToVec(c1, c2)).toEqual(new Vec2(7, 11));
  });
  test('isEqualのテスト', () => {
    const v1 = new Vec2(5, 7);
    const v2 = new Vec2(5, 7);
    expect(Vec2.isEqual(v1, v2)).toBe(true);
  });
});
