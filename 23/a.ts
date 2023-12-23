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
    grid[y].push({ id: cellId++, y, x, char });
  });
});

function walk(current: Cell, steps: number, seen: Set<number>): number {
  if (seen.has(current.id)) return 0;
  seen.add(current.id);
  let longestWalk = 0;

  if (current.y === lines.length - 1 && current.x === lines[0].length - 2) {
    console.log("Reached destination!", steps);
    return steps;
  }

  const north = grid.at(current.y - 1)?.at(current.x);
  const east = grid.at(current.y)?.at(current.x + 1);
  const south = grid.at(current.y + 1)?.at(current.x);
  const west = grid.at(current.y)?.at(current.x - 1);

  switch (current.char) {
    case ".": {
      if (north && north.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(north, steps + 1, new Set(seen)),
        );
      }
      if (east && east.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(east, steps + 1, new Set(seen)),
        );
      }
      if (south && south.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(south, steps + 1, new Set(seen)),
        );
      }
      if (west && west.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(west, steps + 1, new Set(seen)),
        );
      }
      break;
    }
    case "^": {
      if (north && north.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(north, steps + 1, new Set(seen)),
        );
      }
      break;
    }
    case ">": {
      if (east && east.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(east, steps + 1, new Set(seen)),
        );
      }
      break;
    }
    case "v": {
      if (south && south.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(south, steps + 1, new Set(seen)),
        );
      }
      break;
    }
    case "<": {
      if (west && west.char !== "#") {
        longestWalk = Math.max(
          longestWalk,
          walk(west, steps + 1, new Set(seen)),
        );
      }
      break;
    }
  }

  return longestWalk;
}

// 2442
console.info(walk(grid[0][1], 0, new Set()));
