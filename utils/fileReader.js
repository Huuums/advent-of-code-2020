import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

function getAbsoluteFilePath(callerPath, ...args) {
  return resolve(dirname(fileURLToPath(callerPath)), ...args);
}

function readFilecontentsToArray(filePath, seperator = '\n') {
  const textString = fs.readFileSync(filePath, { encoding: 'utf8' });
  return textString.split(seperator);
}

export { readFilecontentsToArray, getAbsoluteFilePath };
