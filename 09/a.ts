const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n").map((x) => x.split(" ").map(Number));

function extrapolate(input: number[]): number {
  if (input.every((x) => x === 0)) return 0;

  const nextList: number[] = [];
  for (let i = 0; i < input.length - 1; i++) {
    nextList.push(input[i + 1] - input[i]);
  }

  return input[input.length - 1] + extrapolate(nextList);
}

let sum = 0;
for (const line of input) {
  sum += extrapolate(line);
}

console.info(sum);
