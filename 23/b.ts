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

const grid: Cell[][] = [];
let cellId = 0;

lines.forEach((line, y) => {
  grid[y] = [];
  line.trim().split("").forEach((char, x) => {
    grid[y].push({ id: cellId++, y, x, char: char === "#" ? "#" : "." });
  });
});

const nodes: Cell[] = [
  grid[0][1], // Start
  grid[lines.length - 1][lines[0].length - 2], // End
];

function loadNodes() {
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
}
// loadNodes();
console.info(nodes);

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

// console.info(distances);

function walk(current: Cell, steps: number, seen: Set<number>): number {
  if (seen.has(current.id)) return 0;
  seen.add(current.id);
  let longestWalk = 0;

  if (current.y === lines.length - 1 && current.x === lines[0].length - 2) {
    // console.log("Reached destination!", steps);
    return steps;
  }

  const neighbours = distances[current.id];

  Object.entries(neighbours).forEach(([nbId, distToNb]) => {
    const nb = nodes.find((n) => n.id === Number(nbId))!;
    const nbDist = walk(nb, steps + distToNb, new Set(seen));

    longestWalk = Math.max(longestWalk, nbDist);
  });

  return longestWalk;
}

// 6898
console.info(walk(nodes[0], 0, new Set()));
