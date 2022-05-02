const getClosestValue = (min: number, max:number, value:number, step:number): number => {
  if (value <= min) {
    return min;
  }
  const range = Math.abs(min - value);
  const delta = Math.round(range / step);
  const newValue = min + step * delta;
  if (newValue >= max) {
    return max;
  }

  return Math.round(newValue * 100) / 100;
};

const getPercentOfValue = (value: number, min: number, max: number): number => {
  const percent = ((value - min) / (max - min)) * 100;
  return percent;
};

export {
  getClosestValue,
  getPercentOfValue,
};
