import { defaultDict } from "../helpers/defaultdict.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

let powerSum = 0;

input.forEach((line) => {
  const dict = defaultDict(Number);

  for (const [_, value, color] of line.matchAll(/(\d+) (\w+)/g)) {
    dict[color] = Math.max(dict[color], +value);
  }

  powerSum += dict.blue * dict.red * dict.green;
});

console.info(powerSum);
