import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';

const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const input = readFilecontentsToArray(inputPath);

const splitTicket = (ticket) => {
  return [...ticket].reduce(
    (acc, letter, i) =>
      i < 7 ? [[...acc[0], letter], acc[1]] : [acc[0], [...acc[1], letter]],
    [[], []]
  );
};

const getPosition = (range, letter) => {
  const [rangeStart, rangeEnd] = range;
  if (letter === 'F' || letter === 'L') {
    return [rangeStart, Math.floor(rangeEnd - (rangeEnd - rangeStart) / 2)];
  }
  return [Math.ceil(rangeStart + (rangeEnd - rangeStart) / 2), rangeEnd];
};

const getSeatId = ([row, column]) => {
  return row * 8 + column;
};

const getSeats = () => {
  return input.map((ticket) => {
    const [rowLetters, columnLetters] = splitTicket(ticket);
    const row = rowLetters.reduce(getPosition, [0, 127])[0];
    const column = columnLetters.reduce(getPosition, [0, 8])[0];
    return [row, column];
  });
};

const part1 = () => {
  return Math.max(...getSeats().map(getSeatId));
};

const part2 = () => {
  return (
    getSeats()
      .map(getSeatId)
      .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
      .find((seat, i, arr) => {
        return i > 0 && (arr[i + 1] !== seat + 1 || arr[i - 1] !== seat - 1);
      }) + 1
    // + 1 because the seat id that gets returned is the one before my seat
  );
};

console.log(part1());
console.log(part2());
