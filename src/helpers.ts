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

export {
  getClosestValue,
};
