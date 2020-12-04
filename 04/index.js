import {
  getAbsoluteFilePath,
  readFilecontentsToArray,
} from '../utils/fileReader.js';
import { isBetween } from '../utils/math.js';

const inputPath = getAbsoluteFilePath(import.meta.url, './', 'input.txt');

const input = readFilecontentsToArray(inputPath, /\n\s*\n/).map((passport) =>
  passport.replace(/\n/g, ' ').split(' ')
);

const allAvailableKeys = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  'cid',
];

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const validateHeight = (value) => {
  const hgtRegex = /(?<number>\d{2,3})(?<unit>\w{2})/;
  const match = hgtRegex.exec(value);
  if (!match) return false;

  const {
    groups: { number, unit },
  } = match;

  if (unit === 'in') return isBetween(parseInt(number, 10), 59, 76);
  if (unit === 'cm') return isBetween(parseInt(number, 10), 150, 193);
  return false;
};

const validate = ([key, value]) => {
  switch (key) {
    case 'byr':
      return isBetween(parseInt(value, 10), 1920, 2002);
    case 'iyr':
      return isBetween(parseInt(value, 10), 2010, 2020);
    case 'eyr':
      return isBetween(parseInt(value, 10), 2020, 2030);
    case 'hgt': {
      return validateHeight(value);
    }
    case 'hcl':
      return Boolean(value.match(/#[0-9a-f]{6}/));
    case 'ecl':
      return eyeColors.includes(value);
    case 'pid':
      return value.length === 9;
    case 'cid':
    default:
      return true;
  }
};

const getKeyValueTuplesFromPassport = (passport) => {
  return passport.map((keyvaluepair) => keyvaluepair.split(':'));
};

const getKeysFromPassport = (passport) => {
  return passport.map((keyvaluepair) => keyvaluepair.split(':')[0]);
};

const allKeysValid = (passport) => {
  return getKeyValueTuplesFromPassport(passport).every(validate);
};
const hasAllRequiredKeys = (optionalKeys) => (passport) => {
  if (passport.length === allAvailableKeys.length) return true;
  const optional = [].concat(optionalKeys);
  const requiredKeys = allAvailableKeys.filter(
    (key) => !optional.includes(key)
  );
  const passportKeys = getKeysFromPassport(passport);
  return requiredKeys.every((key) => passportKeys.includes(key));
};

const part1 = () => input.filter(hasAllRequiredKeys('cid')).length;
const part2 = () =>
  input.filter(hasAllRequiredKeys('cid')).filter(allKeysValid).length;

console.log({ part1: part1() });
console.log({ part2: part2() });
