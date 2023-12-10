import { buildGrid, findVisitedPipes } from "./tile.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");

const { tileGrid, startingTile } = buildGrid(input);
const visitedPipes = findVisitedPipes(tileGrid, startingTile);

const parityScoreMap: Record<string, number> = {
  "|": 1,
  "-": 0,
  "L": 0.5, // L[--]J
  "J": -0.5,
  "7": 0.5, // F[-----]7
  "F": -0.5,
  ".": 0,
  "S": 0,
};

let enclosedTiles = 0;

tileGrid.forEach((row) => {
  let parityScore = 0;

  row.forEach((tile) => {
    if (visitedPipes.has(tile.index)) {
      parityScore += parityScoreMap[tile.char];
      return;
    }

    if (Math.round(parityScore) === parityScore && parityScore % 2) {
      enclosedTiles++;
    }
  });
});

console.info(enclosedTiles);
