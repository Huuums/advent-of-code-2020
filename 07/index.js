import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';

const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const input = readFilecontentsToArray(inputPath);

const getBagContents = (data) => {
  return data.reduce((acc, bagDescription) => {
    const descriptionRegex = /(?<currentBag>.*?)\sbags\scontain\s(?<capacity>\d.*)*/g;
    const {
      groups: { currentBag, capacity },
    } = descriptionRegex.exec(bagDescription);
    if (!capacity) {
      return acc;
    }

    const containedBags = capacity
      .replace(/ bag(?:s)?\./, '')
      .split(/\s(?:bag|bags)/g)
      .map((bag) => {
        const bagRegex = /(?<amount>\d+)\s(?<bagtype>.*)/;
        const {
          groups: { amount, bagtype },
        } = bagRegex.exec(bag);
        return [bagtype, amount];
      });
    acc[currentBag] = Object.fromEntries(containedBags);
    return acc;
  }, {});
};

const findBag = (currentBag, searchedBag, allBags) => {
  if (!currentBag) return false;
  if (currentBag[searchedBag] !== undefined) return true;
  return Object.keys(currentBag).some((row) =>
    findBag(allBags[row], searchedBag, allBags)
  );
};

const countBags = (allBags) => (bagName) => {
  if (!allBags[bagName]) return 0;

  return Object.entries(allBags[bagName]).reduce(
    (sum, [name, amount]) =>
      sum + (1 + countBags(allBags)(name)) * parseInt(amount, 10),
    0
  );
};

const part1 = () => {
  const bagData = getBagContents(input);

  return Object.entries(bagData).reduce((sum, [, bagContent]) => {
    return findBag(bagContent, 'shiny gold', bagData) ? sum + 1 : sum;
  }, 0);
};

const part2 = () => {
  const bagData = getBagContents(input);
  console.log(bagData);
  return countBags(bagData)('shiny gold');
};

console.log(part1());
console.log(part2());
