const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

let powerSum = 0;

input.forEach((line) => {
  const blues = Array.from(line.matchAll(/(\d+) blue/g)).map((x) => +x[1]);
  const greens = Array.from(line.matchAll(/(\d+) green/g)).map((x) => +x[1]);
  const reds = Array.from(line.matchAll(/(\d+) red/g)).map((x) => +x[1]);

  powerSum += Math.max(...blues) *
    Math.max(...greens) *
    Math.max(...reds);
});

console.info(powerSum);
