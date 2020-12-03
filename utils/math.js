export const sum = (...numbers) => {
  return numbers.reduce((acc, val) => acc + val);
};

export const multiply = (...numbers) => {
  return numbers.reduce((acc, val) => acc * val);
};
