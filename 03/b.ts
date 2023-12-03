import { loadSymbolsAndParts, Part } from "./symbol.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);
const { symbols, parts } = loadSymbolsAndParts(input);

let gearRatioSum = 0;

symbols
  .filter((x) => x.char === "*")
  .forEach((symbol) => {
    const gearParts: Part[] = [];

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dy === 0 && dx && 0) continue;

        const partNumber = parts[symbol.y + dy][symbol.x + dx]; // No symbols at the edge of the grid
        if (!partNumber || partNumber.used) continue;

        gearParts.push(partNumber);
        partNumber.used = true;
      }
    }

    if (gearParts.length === 2) {
      gearRatioSum += Number(gearParts[0].value) * Number(gearParts[1].value);
    }
  });

console.log(gearRatioSum);
