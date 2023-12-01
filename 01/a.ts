import { getFirstOccurance, getLastOccurance } from "../helpers/strings.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function solve(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    const first = getFirstOccurance(line, numbers);
    const last = getLastOccurance(line, numbers);

    sum += Number(`${first}${last}`);
  });

  return sum;
}

console.info(solve(input));
