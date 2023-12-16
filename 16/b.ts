import { Direction, findEnergizedTiles } from "./beams.ts";

const lines = await Deno.readTextFile("./input.txt");
const grid = lines.trim().split("\n").map((x) => x.trim().split(""));

let maxEnergy = 0;

for (let x = 0; x < grid[0].length; x++) {
  maxEnergy = Math.max(
    maxEnergy,
    findEnergizedTiles(grid, 0, x, Direction.South),
  );
  maxEnergy = Math.max(
    maxEnergy,
    findEnergizedTiles(grid, grid.length - 1, x, Direction.North),
  );
}
for (let y = 0; y < grid.length; y++) {
  maxEnergy = Math.max(
    maxEnergy,
    findEnergizedTiles(grid, y, 0, Direction.East),
  );
  maxEnergy = Math.max(
    maxEnergy,
    findEnergizedTiles(grid, y, grid[y].length - 1, Direction.West),
  );
}

console.info(maxEnergy);
