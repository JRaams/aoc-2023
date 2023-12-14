import { calculateLoad, directions, slide } from "./platform.ts";

const lines = await Deno.readTextFile("./input.txt");
const input: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

slide(input, directions[0]);
const load = calculateLoad(input);

console.info(load);
