const __dirname = new URL(".", import.meta.url).pathname;
const content = await Deno.readTextFile(__dirname + "/input.txt");
const chars = content.trim().split("\n").map((line) => line.trim().split(""));

type Cell = {
  id: number;
  char: string;
  y: number;
  x: number;
};

const grid: Cell[][] = [];
let start!: Cell;
let cellId = 0;

for (let y = 0; y < chars.length; y++) {
  grid.push([]);
  for (let x = 0; x < chars[y].length; x++) {
    const cell: Cell = { id: cellId++, char: chars[y][x], y, x };
    grid[y].push(cell);

    if (cell.char === "S") {
      start = cell;
    }
  }
}

const seen = new Set<number>();
const destinations = new Set<number>();
const queue: [Cell, number][] = [[start, 64]];

while (queue.length > 0) {
  const [cell, steps] = queue.splice(0, 1)[0];

  if (steps % 2 == 0) {
    destinations.add(cell.id);
  }

  if (steps === 0) {
    continue;
  }

  [[-1, 0], [0, 1], [1, 0], [0, -1]]
    .forEach(([dy, dx]) => {
      const nextY = cell.y + dy;
      const nextX = cell.x + dx;
      const nextCell = grid.at(nextY)?.at(nextX);
      if (!nextCell || nextCell.char === "#" || seen.has(nextCell.id)) {
        return;
      }

      seen.add(nextCell.id);
      queue.push([nextCell, steps - 1]);
    });
}

console.log(destinations.size);
