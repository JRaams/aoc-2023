import { calculateLoad, directions, slide } from "./platform.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input: string[][] = lines
  .trim()
  .split("\n")
  .map((x) => x.trim().split(""));

const stateToIndexMap = new Map<string, number>();
let cycle = 1;
let start = 0;

while (true) {
  for (const dir of directions) {
    slide(input, dir);
  }

  const state = input.map((row) => row.join("")).join("\n");
  if (stateToIndexMap.has(state)) {
    start = stateToIndexMap.get(state)!;
    break;
  }

  stateToIndexMap.set(state, cycle++);
}

const period = cycle - start;
const lastCycle = ((1_000_000_000 - start) % period) + start;
const lastCycleState = Array.from(stateToIndexMap.entries())
  .find(([_, cachedCycle]) => cachedCycle === lastCycle)!;

const load = calculateLoad(
  lastCycleState[0].split("\n").map((x) => x.split("")),
);
console.info(load);
