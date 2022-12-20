const findNearestIndexToValue = (array: number[], value: number): number => {
  if (array.length === 0) {
    return -1;
  }
  const nearestValue = array.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );

  const allIndexOfNearestValue = array.reduce<number[]>((prev, curr, index) => {
    if (curr === nearestValue) {
      prev.push(index);
      return prev;
    }
    return prev;
  }, []);

  if (allIndexOfNearestValue.length === 1) {
    return allIndexOfNearestValue[0];
  }
  if (value > nearestValue) {
    return allIndexOfNearestValue.length - 1;
  }
  return 0;
};

export { findNearestIndexToValue };
