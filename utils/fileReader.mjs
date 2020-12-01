import fs from "fs";

function readFilecontentsToArray(filePath, seperator = "\n") {
  const textString = fs.readFileSync(filePath, { encoding: "utf8" });
  return textString.split(seperator);
}

export { readFilecontentsToArray };
