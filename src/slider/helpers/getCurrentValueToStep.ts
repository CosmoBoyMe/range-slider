const getCurrentValueToStep = (
  min: number,
  max: number,
  value: number,
  prevValue: number,
  step: number
): number => {
  if (value <= min) {
    return min;
  }
  if (value >= max) {
    return max;
  }

  const range = Math.abs(min - value);
  const delta =
    prevValue < value ? Math.floor(range / step) : Math.ceil(range / step);
  const newValue = min + step * delta;

  return Math.round(newValue * 100) / 100;
};

export { getCurrentValueToStep };
