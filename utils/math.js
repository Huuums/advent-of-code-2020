export const sum = (...numbers) => {
  return numbers.reduce((acc, val) => acc + val);
};

export const product = (...numbers) => {
  return numbers.reduce((acc, val) => acc * val);
};

export const isBetween = (num, min, max) => {
  return num >= min && num <= max;
};
