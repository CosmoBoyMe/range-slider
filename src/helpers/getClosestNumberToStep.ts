const getClosestNumberToStep = (value: number, step: number): number => {
  const newStep = Math.abs(step);
  const absValue = Math.abs(value);

  const low = absValue - (absValue % newStep);
  const high = low + newStep;

  const result = absValue - low < high - absValue ? low : high;
  return result * Math.sign(value);
};

export { getClosestNumberToStep };
