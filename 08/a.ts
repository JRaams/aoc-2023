const lines = await Deno.readTextFile("./input.txt");
const [instructionsStr, nodesStr] = lines.trim().split("\n\n");
const instructions = instructionsStr.split("");

const lefts: Record<string, string> = {};
const rights: Record<string, string> = {};
for (const line of nodesStr.split("\n")) {
  const [_, name, leftName, rightName] = line.match(
    /^(\w+) = \((\w+), (\w+)\)$/,
  )!;
  lefts[name] = leftName;
  rights[name] = rightName;
}

let steps = 0;
let currentInstructionIndex = 0;
let currentNode = "AAA";

while (currentNode !== "ZZZ") {
  const currentInstruction =
    instructions[currentInstructionIndex++ % instructions.length];
  if (currentInstruction === "L") {
    currentNode = lefts[currentNode];
  } else {
    currentNode = rights[currentNode];
  }
  steps++;
}

console.info(steps);
