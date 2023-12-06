const input = await Deno.readTextFile("./input.txt");
const lines = input.trim().split("\n\n");

const seeds = lines.splice(0, 1)[0].split(": ")[1].split(" ").map(Number);
const maps = lines.map((x) =>
  x.split("\n").slice(1).map((x) => x.split(" ").map(Number))
);

const locations: number[][] = [];

// For all pairs...
for (let i = 0; i < seeds.length; i += 2) {
  const pair: [number, number] = [seeds[i], seeds[i] + seeds[i + 1]];
  let ranges: number[][] = [pair];
  let results: number[][] = [];

  // ... go over every map ...
  maps.forEach((map) => {
    while (ranges.length > 0) {
      let [start_range, end_range] = ranges.pop()!;
      let found = true;

      for (const [target, start_map, r] of map) {
        const end_map = start_map + r;
        const offset = target - start_map;

        if (end_map <= start_range || end_range <= start_map) {
          continue;
        }

        if (start_range < start_map) {
          ranges.push([start_range, start_map]);
          start_range = start_map;
        }

        if (end_map < end_range) {
          ranges.push([end_map, end_range]);
          end_range = end_map;
        }

        results.push([start_range + offset, end_range + offset]);
        found = false;
        break;
      }

      if (found) {
        results.push([start_range, end_range]);
      }
    }

    ranges = results;
    results = [];
  });

  locations.push(...ranges);
}

console.log(Math.min(...locations.map((x) => x[0])));

// import { GeneratePairs, Pair } from "../helpers/pairs.ts";
// import { Queue } from "../helpers/queue.ts";

// const input = await Deno.readTextFile("./input.txt");
// const lines = input.split("\n\n");
// const seedValues = lines.splice(0, 1)[0].split(": ")[1].split(" ").map(Number);
// const seedPairs = GeneratePairs(seedValues).map((x) => ({
//   left: x.left,
//   right: x.left + x.right,
// }));
// let seeds = seedPairs;

// lines.forEach((mapLines) => {
//   const ranges = mapLines.split("\n").slice(1).map((x) =>
//     x.split(" ").map(Number)
//   );

//   const seedQueue = new Queue(...seedPairs);
//   const newSeeds: Pair<number>[] = [];

//   // deno-lint-ignore no-cond-assign
//   for (let x: Pair<number>; x = seedQueue.dequeue();) {
//     const start = x.left;
//     const end = x.right;

//     let found = false;

//     for (let i = 0; i < ranges.length; i++) {
//       const [target, lower, range] = ranges[i];
//       const upper = lower + range;

//       if (start >= lower && start < upper && end < upper) {
//         let s = start + target - lower;
//         let e = end + target - lower;
//         newSeeds.push({ left: s, right: e });
//         found = true;
//         break;
//       } else if (start >= lower && start < upper) {
//         let s = start + target - lower;
//         let e = upper - 1 + target - lower;
//         newSeeds.push({ left: s, right: e });
//         seedQueue.enqueue({ left: upper, right: end });
//         found = true;
//         break;
//       } else if (start < lower && end >= lower && end < upper) {
//         let s = lower + target - lower;
//         let e = end + target - lower;
//         newSeeds.push({ left: s, right: e });
//         seedQueue.enqueue({ left: start, right: lower - 1 });
//         found = true;
//         break;
//       } else if (start < lower && end >= upper) {
//         newSeeds.push({
//           left: lower + target - lower,
//           right: upper - 1 + target - lower,
//         });
//         seedQueue.enqueue({ left: upper, right: end });
//         seedQueue.enqueue({ left: start, right: lower - 1 });
//         found = true;
//         break;
//       }
//     }

//     if (!found) {
//       newSeeds.push({ left: start, right: end });
//     }
//   }

//   console.info("newSeeds", newSeeds);
//   seeds = newSeeds;
// });

// console.info(seeds);
// console.log(Math.min(...seeds.map((x) => x.left)));
