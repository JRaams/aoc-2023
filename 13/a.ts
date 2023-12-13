import { toTransposedStringArray } from "../helpers/transpose.ts";

const lines = await Deno.readTextFile("./input.txt");
const patterns: string[] = lines.trim().split("\n\n");

function findMirrorIndex(grid: string[]) {
  for (let i = 1; i < grid.length; i++) {
    const aboveMirror = grid.slice(0, i).reverse();
    const belowMirror = grid.slice(i);

    const aboveStr = aboveMirror.slice(0, belowMirror.length).join("");
    const belowStr = belowMirror.slice(0, aboveMirror.length).join("");

    let differentChars = 0;
    for (let x = 0; x < aboveStr.length; x++) {
      if (aboveStr[x] !== belowStr[x]) {
        differentChars++;
      }
    }

    if (differentChars === 0) {
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
