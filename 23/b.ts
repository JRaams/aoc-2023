import { defaultDict } from "../helpers/defaultdict.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const content = await Deno.readTextFile(__dirname + "/input.txt");
const lines = content.trim().split("\n");

type Cell = {
  id: number;
  y: number;
  x: number;
  char: string;
};

function loadGrid(lines: string[]) {
  const grid: Cell[][] = [];
  let cellId = 0;

  lines.forEach((line, y) => {
    grid[y] = [];
    line.trim().split("").forEach((char, x) => {
      grid[y].push({ id: cellId++, y, x, char: char === "#" ? "#" : "." });
    });
  });

  return grid;
}

function loadNodes(grid: Cell[][]) {
  const nodes: Cell[] = [];

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      const cell = grid[y][x];
      if (cell.char !== ".") continue;

      const neighbours = [[-1, 0], [0, 1], [1, 0], [0, -1]]
        .map(([dy, dx]) => grid.at(y + dy)?.at(x + dx)?.char === ".")
        .filter((n) => !!n);

      if (neighbours.length > 2) {
        nodes.push(cell);
      }
    }
  }

  return nodes;
}

function findNodeDistances(grid: Cell[][], nodes: Cell[]) {
  const distances: Record<number, Record<number, number>> = defaultDict(
    () => ({} as Record<number, number>),
  );

  function linkNodes(
    current: Cell,
    steps: number,
    seen: Set<number>,
    prevNode: Cell,
  ) {
    if (seen.has(current.id)) return 0;
    seen.add(current.id);

    const north = grid.at(current.y - 1)?.at(current.x);
    const east = grid.at(current.y)?.at(current.x + 1);
    const south = grid.at(current.y + 1)?.at(current.x);
    const west = grid.at(current.y)?.at(current.x - 1);

    const nb = [north, east, south, west].filter((x) => x && x.char !== "#");
    if (nb.length > 2 && current.id !== prevNode.id) {
      distances[current.id][prevNode.id] = steps;
      distances[prevNode.id][current.id] = steps;
      return;
    }

    if (north && north.char !== "#") {
      linkNodes(north, steps + 1, seen, prevNode);
    }
    if (east && east.char !== "#") {
      linkNodes(east, steps + 1, seen, prevNode);
    }
    if (south && south.char !== "#") {
      linkNodes(south, steps + 1, seen, prevNode);
    }
    if (west && west.char !== "#") {
      linkNodes(west, steps + 1, seen, prevNode);
    }
  }

  nodes.forEach((node) => {
    linkNodes(node, 0, new Set(), node);
  });

  return distances;
}

function walk(
  distances: Record<number, Record<number, number>>,
  current: number,
  target: number,
  seen = new Set<number>(),
): number {
  if (current === target) return 0;

  let dist = Number.MIN_SAFE_INTEGER;
  seen.add(current);

  for (const [nbIdStr, distance] of Object.entries(distances[current])) {
    const nbId = Number(nbIdStr);
    if (!seen.has(nbId)) {
      dist = Math.max(dist, distance + walk(distances, nbId, target, seen));
    }
  }

  seen.delete(current);
  return dist;
}

const grid = loadGrid(lines);

const nodes = loadNodes(grid);
const start = grid[0][1];
const target = grid[grid.length - 1][grid[0].length - 2];
nodes.push(start, target);

const distances = findNodeDistances(grid, nodes);

console.info(walk(distances, start.id, target.id));
