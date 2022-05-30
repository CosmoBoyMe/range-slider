import { Model } from '../Model/Model';

const defaultOptions = {
  min: 0,
  max: 10,
  step: 1,
  scaleCounts: 11,
  vertical: true,
  scale: true,
  tooltip: true,
  progress: true,
  values: [5, 6],
};

const invalidOptions = {
  min: 0,
  max: 10,
  step: 12,
  values: [3],
};

const zeroStepOptions = {
  step: 0,
};

describe('Model:', () => {
  test('should be default options', () => {
    const model = new Model();
    const modelOptions = model.getOptions();
    expect(defaultOptions).toEqual(modelOptions);
  });

  test('values should updated', () => {
    const model = new Model();
    model.updateValue({ value: 3, index: 0 });
    const modelOptions = model.getOptions();
    expect(modelOptions.values).toEqual([3, 6]);
  });

  test('step should normalized ', () => {
    const model = new Model(invalidOptions);
    const modelOptions = model.getOptions();
    expect(modelOptions.step).toBe(10);
  });

  test('step should be not 0', () => {
    const model = new Model(zeroStepOptions);
    const modelOptions = model.getOptions();
    expect(modelOptions.step).toBe(1);
  });

  test('scaleCounts must not be less than 0', () => {
    const model = new Model({ scaleCounts: -20 });
    const modelOptions = model.getOptions();
    expect(modelOptions.scaleCounts).toBe(1);
  });

  test('max value should be equal min value', () => {
    const model = new Model({ min: 10, max: 10 });
    const modelOptions = model.getOptions();
    expect(modelOptions.max).toBe(11);
  });

  test('max value cannot be less than the min value', () => {
    const model = new Model({ min: 20, max: 10 });
    const modelOptions = model.getOptions();
    expect(modelOptions.min).toBe(20);
    expect(modelOptions.max).toBe(21);
  });

  test('min and max should be updated', () => {
    const model = new Model();
    const oldOptions = model.getOptions();
    model.updateOptions({ min: 55, max: 70 });
    const newOptions = model.getOptions();
    expect(oldOptions).not.toEqual(newOptions);
    expect(newOptions.min).toBe(55);
    expect(newOptions.max).toBe(70);
  });
});
