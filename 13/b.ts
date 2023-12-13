import { toTransposedStringArray } from "../helpers/transpose.ts";

const lines = await Deno.readTextFile("./input.txt");
const patterns: string[] = lines.trim().split("\n\n");

function findMirrorIndex(grid: string[]) {
  for (let i = 1; i < grid.length; i++) {
    const above = grid.slice(0, i).reverse();
    const below = grid.slice(i);

    const aboveStr = above.slice(0, below.length).join("");
    const belowStr = below.slice(0, above.length).join("");

    let differentChars = 0;
    for (let x = 0; x < aboveStr.length; x++) {
      if (aboveStr[x] !== belowStr[x]) {
        differentChars++;
      }
    }

    if (differentChars === 1) {
      return i;
    }
  }

  return 0;
}

let total = 0;

patterns.forEach((pattern) => {
  const rows = pattern.split("\n");
  const transposedPattern = toTransposedStringArray(rows);
  total += 100 * findMirrorIndex(rows) + findMirrorIndex(transposedPattern);
});

console.info(total);
