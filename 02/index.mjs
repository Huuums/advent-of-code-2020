import { readFilecontentsToArray } from "../utils/fileReader.mjs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const inputPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "./",
  "input.txt"
);

const input = readFilecontentsToArray(inputPath);

const getPolicyParts = (policy) => {
  const [minAndMax, charwithColon, password] = policy.split(" ");
  const [min, max] = minAndMax.split("-");

  return { min, max, char: charwithColon.charAt(0), password };
};

const part1 = () => {
  const validPasswords = input.filter((policy) => {
    const { min, max, char, password } = getPolicyParts(policy);
    const occurences = password.split(char).length - 1;
    return occurences >= min && occurences <= max;
  });
  return validPasswords.length;
};

const part2 = () => {
  const validPasswords = input.filter((policy) => {
    const { min: position1, max: position2, char, password } = getPolicyParts(
      policy
    );

    const firstPosition = position1 - 1;
    const secondPosition = position2 - 1;

    return (
      (password.charAt(firstPosition) === char) ^
      (password.charAt(secondPosition) === char)
    );
  });
  return validPasswords.length;
};

console.log({ part1: part1() });
console.log({ part2: part2() });
