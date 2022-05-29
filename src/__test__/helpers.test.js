import {
  getPercentOfValue,
  getClosestValue,
  findNearestIndexToValue,
  getClosestNumberToStep,
} from '../helpers';

describe('getPercentOfValue func:', () => {
  test('percent should be 0 if value equal to min value ', () => {
    const percent = getPercentOfValue(5, 5, 100);
    expect(percent).toBe(0);
  });
  test('percent should be 100 if value equal to max value', () => {
    const percent = getPercentOfValue(100, 5, 100);
    expect(percent).toBe(100);
  });
});

describe('getClosestValue func:', () => {
  test('closest value should be min value', () => {
    const closestValue = getClosestValue(5, 10, 1, 1);
    expect(closestValue).toBe(5);
  });
  test('closest value should be max value', () => {
    const closestValue = getClosestValue(0, 10, 20, 1);
    expect(closestValue).toBe(10);
  });
  test('closest value should be rounded to step', () => {
    const closestValue = getClosestValue(0, 10, 4.5, 1);
    expect(closestValue).toBe(5);
  });
});

describe('findNearestIndexToValue func:', () => {
  test('array is empty', () => {
    const nearestIndex = findNearestIndexToValue([], 5);
    expect(nearestIndex).toBe(-1);
  });

  test('value not be in array', () => {
    const array = [1, 2, 3, 4, 10];
    const nearestIndex = findNearestIndexToValue(array, 5);
    expect(nearestIndex).toBe(3);
  });

  test('value is in array', () => {
    const array = [10, 6, 7, 3, 5];
    const nearestIndex = findNearestIndexToValue(array, 5);
    expect(nearestIndex).toBe(4);
  });

  test('must be the first matching index ', () => {
    const array = [5, 5, 5, 5, 5, 5];
    const nearestIndex = findNearestIndexToValue(array, 5);
    expect(nearestIndex).toBe(0);
  });

  test('must return the last matching index', () => {
    const array = [5, 5, 5, 5, 5, 5];
    const nearestIndex = findNearestIndexToValue(array, 7);
    expect(nearestIndex).toBe(5);
  });
});

describe('getClosestNumberToStep func:', () => {
  test('value should be closest to step', () => {
    const closestValue = getClosestNumberToStep(5, 1);
    expect(closestValue).toBe(5);
  });

  test('should work with decimal step', () => {
    expect(getClosestNumberToStep(5, 0.33)).toBe(4.95);
    expect(getClosestNumberToStep(0.55, 0.33)).toBe(0.66);
    expect(getClosestNumberToStep(10, 0.01)).toBe(10);
  });
});
