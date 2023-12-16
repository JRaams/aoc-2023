import { toTransposedStringArray, zip } from "../helpers/arrays.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const patterns: string[] = lines.trim().split("\n\n");

function findMirrorIndex(grid: string[]) {
  for (let i = 1; i < grid.length; i++) {
    const aboveMirror = grid.slice(0, i).reverse();
    const belowMirror = grid.slice(i);

    let differentChars = 0;
    for (const [row1, row2] of zip(aboveMirror, belowMirror)) {
      for (let x = 0; x < row1.length; x++) {
        if (row1[x] !== row2[x]) {
          differentChars++;
        }
      }
    }

    if (differentChars === 1) {
      return i;
    }
  }

  return 0;
}

let sum = 0;

patterns.forEach((pattern) => {
  const rows = pattern.split("\n");
  const transposedPattern = toTransposedStringArray(rows);
  sum += 100 * findMirrorIndex(rows) + findMirrorIndex(transposedPattern);
});

console.info(sum);
