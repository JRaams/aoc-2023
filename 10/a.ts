import { Queue } from "../helpers/queue.ts";
import { buildGrid, getNeighbours, Tile } from "./tile.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");

const { tileGrid, startingTile } = buildGrid(input);
const queue = new Queue<Tile>(startingTile);
const seen = new Set<number>([startingTile.index]);

while (queue.length > 0) {
  const tile = queue.dequeue();

  getNeighbours(tile, tileGrid).forEach((nb) => {
    if (seen.has(nb.index)) return;

    queue.enqueue(nb);
    seen.add(nb.index);
  });
}

console.info(seen.size / 2);
