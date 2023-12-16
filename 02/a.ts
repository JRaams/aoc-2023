import { defaultDict } from "../helpers/defaultdict.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.split("\n").filter((l) => l);

let idSum = 0;

input.forEach((line, lineNumber) => {
  const dict = defaultDict(Number);

  for (const [_, value, color] of line.matchAll(/(\d+) (\w+)/g)) {
    dict[color] = Math.max(dict[color], +value);
  }

  if (dict.blue <= 14 && dict.green <= 13 && dict.red <= 12) {
    idSum += lineNumber + 1;
  }
});

console.info(idSum);
