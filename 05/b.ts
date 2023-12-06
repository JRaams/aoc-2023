const input = await Deno.readTextFile("./input.txt");
const lines = input.trim().split("\n\n");

const seeds = lines.splice(0, 1)[0].split(": ")[1].split(" ").map(Number);
const maps = lines.map((x) =>
  x.split("\n").slice(1).map((x) => x.split(" ").map(Number))
);

const locations: number[][] = [];

for (let i = 0; i < seeds.length; i += 2) {
  const initialRange: [number, number] = [seeds[i], seeds[i] + seeds[i + 1]];
  let seedRanges: number[][] = [initialRange];

  maps.forEach((map) => {
    const results: number[][] = [];

    while (seedRanges.length > 0) {
      const currentSeedRange = seedRanges.pop()!;

      const [seedSubRanges, newResults] = applyMapToSeedRange(
        currentSeedRange,
        map,
      );
      seedRanges.push(...seedSubRanges);
      results.push(...newResults);
    }

    seedRanges = results;
  });

  locations.push(...seedRanges);
}

function applyMapToSeedRange(currentSeedRange: number[], map: number[][]) {
  let [currentStart, currentEnd] = currentSeedRange;

  const seedSubRanges: number[][] = [];
  const newResults: number[][] = [];
  let foundAnyIntersectionInMap = false;

  for (const [mapDest, mapSource, mapRange] of map) {
    const mapEnd = mapSource + mapRange;

    // No intersection for the current map entry with the current range
    if (currentEnd <= mapSource || mapEnd <= currentStart) {
      continue;
    }

    // Some part of the current range extends the front of the map entry
    if (currentStart < mapSource) {
      seedSubRanges.push([currentStart, mapSource]);
      currentStart = mapSource;
    }

    // Some part of the current range extends the back of the map entry
    if (mapEnd < currentEnd) {
      seedSubRanges.push([mapEnd, currentEnd]);
      currentEnd = mapEnd;
    }

    // Add the intersecting part between the map entry and current range to the results
    const offset = mapDest - mapSource;
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
