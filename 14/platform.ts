export const directions: [number, number][] = [
  [-1, 0], // North
  [0, -1], // West
  [1, 0], // South
  [0, 1], // East
];

export function slide(grid: string[][], direction: [number, number]) {
  let hasChange = false;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (cell !== "O") continue;

      const [dy, dx] = direction;
      const nextCell = grid[y + dy]?.[x + dx];
      if (nextCell === ".") {
        grid[y + dy][x + dx] = "O";
        grid[y][x] = ".";
        hasChange = true;
      }
    }
  }

  if (hasChange) {
    slide(grid, direction);
  }
}

export function calculateLoad(map: string[][]) {
  let load = 0;

  for (let y = 0; y < map.length; y++) {
    const rocks = map[y].filter((x) => x === "O").length;
    load += rocks * (map.length - y);
  }

  return load;
}
