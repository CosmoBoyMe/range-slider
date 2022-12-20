const getPercentOfValue = (value: number, min: number, max: number): number => {
  const percent = ((value - min) / (max - min)) * 100;
  return percent;
};

export { getPercentOfValue };
