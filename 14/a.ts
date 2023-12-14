const lines = await Deno.readTextFile("./input.txt");
const input: string[][] = lines.trim().split("\n").map((x) =>
  x.trim().split("")
);

function slideNorth(grid: string[][]) {
  let changes = 0;

  for (let y = 1; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (cell !== "O") continue;

      if (grid[y - 1][x] === ".") {
        grid[y - 1][x] = "O";
        grid[y][x] = ".";
        changes++;
      }
    }
  }

  if (changes > 0) {
    slideNorth(grid);
  }
}

slideNorth(input);

let load = 0;

for (let y = 0; y < input.length; y++) {
  const rocks = input[y].filter((x) => x === "O").length;
  load += rocks * (input.length - y);
}

console.info(load);
