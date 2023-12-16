import { lcmBulk } from "../helpers/math.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const [instructionsStr, nodesStr] = lines.trim().split("\n\n");
const instructions = instructionsStr.split("");

const Anodes: string[] = [];
const lefts: Record<string, string> = {};
const rights: Record<string, string> = {};
for (const line of nodesStr.split("\n")) {
  const [_, name, left, right] = line.match(/^(\w+) = \((\w+), (\w+)\)$/)!;
  lefts[name] = left;
  rights[name] = right;

  if (name.endsWith("A")) {
    Anodes.push(name);
  }
}

const solveTimes: number[] = [];

for (let node of Anodes) {
  let steps = 0;

  while (!node.endsWith("Z")) {
    const instruction = instructions[steps++ % instructions.length];

    if (instruction === "L") {
      node = lefts[node];
    } else {
      node = rights[node];
    }
  }

  solveTimes.push(steps);
}

console.info(lcmBulk(...solveTimes));
