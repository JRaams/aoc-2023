import { combinationsN } from "../helpers/combinations.ts";

export function getGalaxyPairLengthSum(input: string[], expansion: number) {
  const emptyRows = new Set<number>();
  const emptyColumns = new Set<number>();
  const galaxies: [number, number][] = [];

  input.forEach((line, y) => {
    if (!line.includes("#")) {
      emptyRows.add(y);
    }

    line.split("").forEach((char, x) => {
      if (char === "#") {
        galaxies.push([y, x]);
      } else if (y === 0 && input.every((row) => row[x] !== "#")) {
        emptyColumns.add(x);
      }
    });
  });

  let sum = 0;
  for (const [[y1, x1], [y2, x2]] of combinationsN(galaxies, 2)) {
    for (let x = Math.min(x1, x2); x < Math.max(x1, x2); x++) {
      sum += emptyColumns.has(x) ? expansion : 1;
    }

    for (let y = Math.min(y1, y2); y < Math.max(y1, y2); y++) {
      sum += emptyRows.has(y) ? expansion : 1;
    }
  }

  return sum;
}
