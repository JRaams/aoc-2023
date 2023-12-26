import { defaultDict } from "../helpers/defaultdict.ts";

type Plot = {
  id: number;
  char: string;
  y: number;
  x: number;
};

export function buildGarden(chars: string[][]) {
  const garden: Plot[][] = [];
  let start!: Plot;
  let cellId = 0;

  for (let y = 0; y < chars.length; y++) {
    garden.push([]);
    for (let x = 0; x < chars[y].length; x++) {
      const cell: Plot = { id: cellId++, char: chars[y][x], y, x };
      garden[y].push(cell);

      if (cell.char === "S") {
        start = cell;
      }
    }
  }

  return { garden, start };
}

export function getPlotsReachableInNSteps(
  garden: Plot[][],
  start: Plot,
  NSteps: number,
): number {
  const seen = defaultDict(Number);
  const queue: [number, number, number][] = [[start.y, start.x, NSteps]];

  while (queue.length > 0) {
    const [y, x, steps] = queue.shift()!;

    const key = y + "_" + x;
    if (seen[key] >= steps) {
      continue;
    }
    seen[key] = steps;

    if (steps === 0) {
      continue;
    }

    [[-1, 0], [0, 1], [1, 0], [0, -1]]
      .forEach(([dy, dx]) => {
        const ny = y + dy;
        const nx = x + dx;

        // Do char lookup in wrapped garden grid
        const l = garden.length;
        const wy = (ny % l + l) % l;
        const wx = (nx % l + l) % l;
        if (garden[wy][wx].char === "#") return;

        queue.push([ny, nx, steps - 1]);
      });
  }

  return Object.values(seen).filter((e) => e % 2 == 0).length;
}
