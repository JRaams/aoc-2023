import { Direction, findEnergizedTiles } from "./beams.ts";

const lines = await Deno.readTextFile("./input.txt");
const grid = lines.trim().split("\n").map((x) => x.trim().split(""));

const energizedTiles = findEnergizedTiles(grid, 0, 0, Direction.East);
console.info(energizedTiles);
