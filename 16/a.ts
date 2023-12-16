import { Direction, findEnergizedTiles } from "./beams.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const grid = lines.trim().split("\n").map((x) => x.trim().split(""));

const energizedTiles = findEnergizedTiles(grid, 0, 0, Direction.East);
console.info(energizedTiles);
