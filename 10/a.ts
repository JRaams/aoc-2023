import { buildGrid, findVisitedPipes } from "./tile.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");

const { tileGrid, startingTile } = buildGrid(input);
const visitedPipes = findVisitedPipes(tileGrid, startingTile);

console.info(visitedPipes.size / 2);
