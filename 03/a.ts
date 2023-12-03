import { loadSymbolsAndParts } from "./symbol.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);
const { symbols, parts } = loadSymbolsAndParts(input);

let sum = 0;

symbols.forEach((symbol) => {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const part = parts[symbol.y + dy][symbol.x + dx]; // No symbols at the edge of the grid
      if (!part || part.used) continue;

      sum += Number(part.value);
      part.used = true;
    }
  }
});

console.log(sum);
