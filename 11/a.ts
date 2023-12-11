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

console.info(emptyRows);
console.info(emptyColumns);
console.info(galaxies);

let sum = 0;

for (let i = 0; i < galaxies.length; i++) {
  for (let j = i + 1; j < galaxies.length; j++) {
    const { y: y1, x: x1 } = galaxies[i];
    const { y: y2, x: x2 } = galaxies[j];

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    let dx = maxX - minX;

    emptyColumns.forEach((col) => {
      if (minX < col && col < maxX) dx++;
    });

    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    let dy = maxY - minY;

    emptyRows.forEach((row) => {
      if (minY < row && row < maxY) dy++;
    });

    sum += dx + dy;
  }
}

console.info(sum);
