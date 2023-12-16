import { calculateLoad, directions, slide } from "./platform.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

slide(input, directions[0]);
const load = calculateLoad(input);

console.info(load);
