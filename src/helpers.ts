const getClosestValue = (min: number, max:number, value:number, step:number): number => {
  if (value <= min) {
    return min;
  }
  if (value >= max) {
    return max;
  }

  const range = Math.abs(min - value);
  const delta = Math.round(range / step);
  const newValue = min + step * delta;

  return Math.round(newValue * 100) / 100;
};

const findNearestIndexToValue = (arr:number[], value: number): number => {
  if (arr.length === 0) {
    return -1;
  }
  const nearestValue = arr.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value)
    ? curr
    : prev));

  return arr.indexOf(nearestValue);
};

const getPercentOfValue = (value: number, min: number, max: number): number => {
  const percent = ((value - min) / (max - min)) * 100;
  return percent;
};

const getClosestNumberToStep = (value: number, step:number): number => {
  const newStep = Math.abs(step);
  const absValue = Math.abs(value);

  const low = absValue - (absValue % newStep);
  const high = low + newStep;

  const result = absValue - low < high - absValue ? low : high;
  return result * Math.sign(value);
};

export {
  getClosestValue,
  findNearestIndexToValue,
  getPercentOfValue,
  getClosestNumberToStep,
};
