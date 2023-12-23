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
      grid[y].push({ id: cellId++, y, x, char });
    });
  });

  return grid;
}

function walk(
  grid: Cell[][],
  current: Cell,
  steps: number,
  seen: Set<number>,
): number {
  if (seen.has(current.id)) return 0;
  seen.add(current.id);

  if (current.y === lines.length - 1 && current.x === lines[0].length - 2) {
    return steps;
  }

  let max = 0;
  switch (current.char) {
    case ".": {
      const north = grid.at(current.y - 1)?.at(current.x);
      if (north && north.char !== "#") {
        max = Math.max(max, walk(grid, north, steps + 1, new Set(seen)));
      }

      const east = grid.at(current.y)?.at(current.x + 1);
      if (east && east.char !== "#") {
        max = Math.max(max, walk(grid, east, steps + 1, new Set(seen)));
      }

      const south = grid.at(current.y + 1)?.at(current.x);
      if (south && south.char !== "#") {
        max = Math.max(max, walk(grid, south, steps + 1, new Set(seen)));
      }

      const west = grid.at(current.y)?.at(current.x - 1);
      if (west && west.char !== "#") {
        max = Math.max(max, walk(grid, west, steps + 1, new Set(seen)));
      }
      break;
    }
    case "^": {
      const north = grid.at(current.y - 1)?.at(current.x);
      if (north && north.char !== "#") {
        max = Math.max(max, walk(grid, north, steps + 1, new Set(seen)));
      }
      break;
    }
    case ">": {
      const east = grid.at(current.y)?.at(current.x + 1);
      if (east && east.char !== "#") {
        max = Math.max(max, walk(grid, east, steps + 1, new Set(seen)));
      }
      break;
    }
    case "v": {
      const south = grid.at(current.y + 1)?.at(current.x);
      if (south && south.char !== "#") {
        max = Math.max(max, walk(grid, south, steps + 1, new Set(seen)));
      }
      break;
    }
    case "<": {
      const west = grid.at(current.y)?.at(current.x - 1);
      if (west && west.char !== "#") {
        max = Math.max(max, walk(grid, west, steps + 1, new Set(seen)));
      }
      break;
    }
  }

  return max;
}

const grid = loadGrid(lines);
console.info(walk(grid, grid[0][1], 0, new Set()));
