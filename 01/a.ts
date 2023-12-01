const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

function solve(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    const first = line.match(/\d/)!.at(0);
    const last = line.match(/\d/g)!.at(-1);

    sum += Number(`${first}${last}`);
  });

  return sum;
}

console.info(solve(input));
