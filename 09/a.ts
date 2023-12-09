const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n").map((x) => x.split(" ").map(Number));

function extrapolate(input: number[]): number {
  if (input.every((x) => x === 0)) return 0;

  const nextList: number[] = [];
  for (let i = 0; i < input.length - 1; i++) {
    const offset = input[i + 1] - input[i];
    nextList.push(offset);
  }

  const next = extrapolate(nextList);
  return input.at(-1)! + next;
}

let sum = 0;

for (const line of input) {
  const nextNumber = extrapolate(line);
  console.info(line, nextNumber);
  sum += nextNumber;
}

console.info(sum);
