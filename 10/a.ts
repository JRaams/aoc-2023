import { buildGrid, findVisitedPipes } from "./tile.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

const { tileGrid, startingTile } = buildGrid(input);
const visitedPipes = findVisitedPipes(tileGrid, startingTile);

console.info(visitedPipes.size / 2);
