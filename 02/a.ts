const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

let idSum = 0;

input.forEach((line, i) => {
  const blues = Array.from(line.matchAll(/(\d+) blue/g)).map((x) => +x[1]);
  const greens = Array.from(line.matchAll(/(\d+) green/g)).map((x) => +x[1]);
  const reds = Array.from(line.matchAll(/(\d+) red/g)).map((x) => +x[1]);

  if (
    Math.max(...blues) <= 14 &&
    Math.max(...greens) <= 13 &&
    Math.max(...reds) <= 12
  ) {
    idSum += i + 1;
  }
});

console.info(idSum);
