import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';

const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const add = (...numbers) => {
  return numbers.reduce((acc, val) => acc + val);
};

const multiply = (...numbers) => {
  return numbers.reduce((acc, val) => acc * val);
};

const input = readFilecontentsToArray(inputPath).map((row) =>
  parseInt(row, 10)
);

const part1 = () =>
  input.reduce((acc, val) => {
    if (acc !== 0) return acc;
    const matchingNum = input.find((row) => add(val, row) === 2020);
    if (matchingNum) {
      return multiply(val, matchingNum);
    }
    return acc;
  }, 0);

const part2 = () =>
  input.reduce((acc, val) => {
    if (acc !== 0) return acc;
    const matchingNums = input.filter((filterRow) =>
      input.some((inner) => add(val, filterRow, inner) === 2020)
    );
    if (matchingNums.length) {
      return multiply(val, ...matchingNums);
    }
    return acc;
  }, 0);

console.log(part1());
console.log(part2());
