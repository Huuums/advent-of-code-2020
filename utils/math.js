export const sum = (...numbers) => {
  return numbers.reduce((acc, val) => acc + val);
};

export const product = (...numbers) => {
  return numbers.reduce((acc, val) => acc * val);
};
