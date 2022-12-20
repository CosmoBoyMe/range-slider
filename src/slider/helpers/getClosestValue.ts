const getClosestValue = (
  min: number,
  max: number,
  value: number,
  step: number
): number => {
  if (value <= min) {
    return min;
  }
  if (value >= max) {
    return max;
  }
  const range = Math.abs(min - value);
  const delta = Math.round(range / step);

  const newValue = min + step * delta;
  const roundedValue = Math.round(newValue * 100) / 100;
  if (roundedValue > max) {
    return max;
  }
  if (value + step >= max) {
    const differenceValueToStartValue = Math.abs(value - roundedValue);
    const differenceValueFromEndValue = Math.abs(max - Math.round(value));
    if (differenceValueToStartValue > differenceValueFromEndValue) {
      return max;
    }
  }
  return roundedValue;
};

export { getClosestValue };
