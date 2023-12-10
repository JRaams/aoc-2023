import { Queue } from "../helpers/queue.ts";

export type Tile = {
  index: number;
  char: string;
  y: number;
  x: number;
};

export function buildGrid(input: string[]) {
  const tileGrid: Tile[][] = [];
  let tileIndex = 0;
  let startingTile!: Tile;

  for (let y = 0; y < input.length; y++) {
    tileGrid.push(new Array(input[y].length));

    for (let x = 0; x < input[y].length; x++) {
      const pos = { y, x, char: input[y][x], index: tileIndex++ };
      tileGrid[y][x] = pos;

      if (pos.char === "S") {
        startingTile = pos;
      }
    }
  }

  return { tileGrid, startingTile };
}

export function findVisitedPipes(tileGrid: Tile[][], startingTile: Tile) {
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

  return seen;
}

function getNeighbours(pos: Tile, tileGrid: Tile[][]) {
  const neighbours: Tile[] = [];

  if (pos.y - 1 >= 0) {
    const topPos = tileGrid[pos.y - 1][pos.x];
    if (
      ["S", "|", "L", "J"].includes(pos.char) &&
      ["|", "7", "F"].includes(topPos.char)
    ) {
      neighbours.push(topPos);
    }
  }

  if (pos.x + 1 < tileGrid[0].length) {
    const rightPos = tileGrid[pos.y][pos.x + 1];
    if (
      ["S", "-", "F", "L"].includes(pos.char) &&
      ["-", "7", "J"].includes(rightPos.char)
    ) {
      neighbours.push(rightPos);
    }
  }

  if (pos.y + 1 < tileGrid.length) {
    const bottomPos = tileGrid[pos.y + 1][pos.x];
    if (
      ["S", "|", "7", "F"].includes(pos.char) &&
      ["|", "J", "L"].includes(bottomPos.char)
    ) {
      neighbours.push(bottomPos);
    }
  }

  if (pos.x - 1 >= 0) {
    const leftPos = tileGrid[pos.y][pos.x - 1];
    if (
      ["S", "-", "J", "7"].includes(pos.char) &&
      ["-", "L", "F"].includes(leftPos.char)
    ) {
      neighbours.push(leftPos);
    }
  }

  return neighbours;
}
