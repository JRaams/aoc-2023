const lines = await Deno.readTextFile("./input.txt");
const input: string[][] = lines.trim().split("\n").map((x) =>
  x.trim().split("")
);

const directions: [number, number][] = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function slide(grid: string[][], direction: [number, number]) {
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

function calculateLoad(map: string[][]) {
  let load = 0;

  for (let y = 0; y < map.length; y++) {
    const rocks = map[y].filter((x) => x === "O").length;
    load += rocks * (map.length - y);
  }

  return load;
}

const cache: Record<string, number> = {};
let cycle = 1;

while (true) {
  for (const dir of directions) {
    slide(input, dir);
  }

  const state = input.map((row) => row.join("")).join("\n");
  if (cache[state] !== undefined) {
    const start = cache[state];
    const period = cycle - start;
    const finalCycle = ((1_000_000_000 - start) % period) + start;

    for (const [pastState, pastCycle] of Object.entries(cache)) {
      if (pastCycle === finalCycle) {
        const map = pastState.split("\n").map((x) => x.split(""));
        const load = calculateLoad(map);
        console.info(load);
      }
    }
    break;
  }

  cache[state] = cycle++;
}
