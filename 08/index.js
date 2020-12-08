import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';

const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const input = readFilecontentsToArray(inputPath).map((row) => row.split(' '));

const part1 = () => {
  const triggeredIndex = [];
  let i = 0;
  let acc = 0;
  while (i < input.length) {
    if (triggeredIndex.includes(i)) break;
    triggeredIndex.push(i);
    const [operation, argument] = input[i];
    switch (operation) {
      case 'jmp':
        i += parseInt(argument, 10);
        break;
      case 'acc':
        acc += parseInt(argument, 10);
        i += 1;
        break;
      case 'nop':
      default:
        i += 1;
        break;
    }
  }

  return acc;
};

const part2 = () => {
  return input
    .map(([changeOperation], index) => {
      if (changeOperation === 'acc') return false;
      const triggeredIndex = [];
      let i = 0;
      let acc = 0;
      while (i < input.length) {
        if (triggeredIndex.includes(i)) return false;
        triggeredIndex.push(i);
        let [operation] = input[i];
        const [, argument] = input[i];
        if (index === i) {
          operation = operation === 'nop' ? 'jmp' : 'nop';
        }
        switch (operation) {
          case 'jmp':
            i += parseInt(argument, 10);
            break;
          case 'acc':
            acc += parseInt(argument, 10);
            i += 1;
            break;
          case 'nop':
          default:
            i += 1;
            break;
        }
      }
      return acc;
    })
    .filter(Boolean)[0];
};

console.log(part1());
console.log(part2());
