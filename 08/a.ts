const lines = await Deno.readTextFile("./input.txt");
const [instructionsStr, nodesStr] = lines.trim().split("\n\n");
const instructions = instructionsStr.split("");

const lefts: Record<string, string> = {};
const rights: Record<string, string> = {};
for (const line of nodesStr.split("\n")) {
  const [_, name, left, right] = line.match(/^(\w+) = \((\w+), (\w+)\)$/)!;
  lefts[name] = left;
  rights[name] = right;
}

let steps = 0;
let node = "AAA";

while (node !== "ZZZ") {
  const instruction = instructions[steps++ % instructions.length];

  if (instruction === "L") {
    node = lefts[node];
  } else {
    node = rights[node];
  }
}

console.info(steps);
