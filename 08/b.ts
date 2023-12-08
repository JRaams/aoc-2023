import { lcmBulk } from "../helpers/math.ts";

const lines = await Deno.readTextFile("./input.txt");
const [instructionsStr, nodesStr] = lines.trim().split("\n\n");
const instructions = instructionsStr.split("");

const Anodes: string[] = [];
const lefts: Record<string, string> = {};
const rights: Record<string, string> = {};
for (const line of nodesStr.split("\n")) {
  const [_, name, leftName, rightName] = line.match(
    /^(\w+) = \((\w+), (\w+)\)$/,
  )!;
  if (name.endsWith("A")) {
    Anodes.push(name);
  }
  lefts[name] = leftName;
  rights[name] = rightName;
}

console.info(Anodes);

const solveTimes: number[] = [];

for (let currentNode of Anodes) {
  let currentInstructionIndex = 0;
  let steps = 0;

  while (!currentNode.endsWith("Z")) {
    const currentInstruction =
      instructions[currentInstructionIndex++ % instructions.length];

    if (currentInstruction === "L") {
      currentNode = lefts[currentNode];
    } else {
      currentNode = rights[currentNode];
    }

    steps++;
  }

  solveTimes.push(steps);
}

console.info(lcmBulk(...solveTimes));
