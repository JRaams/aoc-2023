const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");

type Pos = {
  y: number;
  x: number;
};

const emptyRows = new Set<number>();
const emptyColumns = new Set<number>();
const galaxies: Pos[] = [];

input.forEach((line, y) => {
  if (!line.includes("#")) {
    emptyRows.add(y);
  }

  line.split("").forEach((char, x) => {
    if (char === "#") {
      galaxies.push({ y, x });
    } else if (y === 0 && input.every((row) => row[x] !== "#")) {
      emptyColumns.add(x);
    }
  });
});

let sum = 0;
const expansion = 1_000_000;

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const { y: y1, x: x1 } = galaxies[i];
    const { y: y2, x: x2 } = galaxies[j];

    for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
      sum += emptyColumns.has(x) ? expansion : 1;
    }

    for (let y = Math.min(y1, y1); y < Math.max(y1, y2); y++) {
      sum += emptyRows.has(y) ? expansion : 1;
    }
  }
}

console.info(sum);
