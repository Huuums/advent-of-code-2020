import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';
import { sum } from '../utils/math.js';

const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const input = readFilecontentsToArray(inputPath, /\n\s*\n/).map((passport) =>
  passport.replace(/\n/g, ' ').split(' ')
);

const part1 = () => {
  return sum(
    ...input.map((group) => {
      const set = new Set(group.join('').split(''));
      return set.size;
    })
  );
};

const part2 = () => {
  return sum(
    ...input.map((group) => {
      return group[0]
        .split('')
        .filter((el) => group.every((gr) => gr.split('').includes(el))).length;
    })
  );
};

console.log(part1());
console.log(part2());
