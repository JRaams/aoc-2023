const __dirname = new URL(".", import.meta.url).pathname;
const input = await Deno.readTextFile(__dirname + "/input.txt");
const lines = input.trim().split("\n\n");

const seeds = lines.splice(0, 1)[0].split(": ")[1].split(" ").map(Number);
const maps = lines.map((x) =>
  x.split("\n").slice(1).map((x) => x.split(" ").map(Number))
);

const locations: number[][] = [];

for (let i = 0; i < seeds.length; i += 2) {
  const initialRange = [seeds[i], seeds[i] + seeds[i + 1]];
  let seedRanges = [initialRange];

  maps.forEach((map) => {
    const results: number[][] = [];

    while (seedRanges.length > 0) {
      const currentSeedRange = seedRanges.pop()!;

      const [seedSubRanges, newResults] = applyRange(currentSeedRange, map);
      seedRanges.push(...seedSubRanges);
      results.push(...newResults);
    }

    seedRanges = results;
  });

  locations.push(...seedRanges);
}

function applyRange(currentSeedRange: number[], map: number[][]) {
  let [currentStart, currentEnd] = currentSeedRange;

  const seedSubRanges: number[][] = [];
  const newResults: number[][] = [];
  let foundAnyIntersectionInMap = false;

  for (const [mapDestStart, mapSourceStart, mapRange] of map) {
    const mapSourceEnd = mapSourceStart + mapRange;

    // No intersection for the current map entry with the current range
    if (currentEnd <= mapSourceStart || mapSourceEnd <= currentStart) {
      continue;
    }

    // Some part of the current range extends the front of the map entry
    if (currentStart < mapSourceStart) {
      seedSubRanges.push([currentStart, mapSourceStart]);
      currentStart = mapSourceStart;
    }

    // Some part of the current range extends the back of the map entry
    if (mapSourceEnd < currentEnd) {
      seedSubRanges.push([mapSourceEnd, currentEnd]);
      currentEnd = mapSourceEnd;
    }

    // Add the intersecting part between the map entry and current range to the results
    const offset = mapDestStart - mapSourceStart;
    newResults.push([currentStart + offset, currentEnd + offset]);
    foundAnyIntersectionInMap = true;
    break;
  }

  // If no entries in the map have an intersection with the current range, add the whole range's values as a result
  if (!foundAnyIntersectionInMap) {
    newResults.push([currentStart, currentEnd]);
  }

  return [seedSubRanges, newResults];
}

console.log(Math.min(...locations.map((x) => x[0])));
