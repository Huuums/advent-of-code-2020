import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';
import { product } from '../utils/math.js';

/* eslint-disable-next-line */
const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const input = readFilecontentsToArray(inputPath).map((row) => row.split(''));

const getEncounteredTrees = (right, down = 1) => {
  return input.reduce((acc, row, i) => {
    if (i === 0 || i % down !== 0) return acc;
    const downsteps = i / down;
    const index = (downsteps * right) % row.length;
    return row[index] === '#' ? acc + 1 : acc;
  }, 0);
};

const part1 = () => getEncounteredTrees(3, 1);
const part2 = () =>
  product(
    getEncounteredTrees(1, 1),
    getEncounteredTrees(3, 1),
    getEncounteredTrees(5, 1),
    getEncounteredTrees(7, 1),
    getEncounteredTrees(1, 2)
  );

console.log(part1());
console.log(part2());
