const __dirname = new URL(".", import.meta.url).pathname;
const input = await Deno.readTextFile(__dirname + "/input.txt");
const lines = input.trim().split("\n\n");

const seeds = lines.splice(0, 1)[0].split(": ")[1].split(" ").map(Number);
const maps = lines.map((x) =>
  x.split("\n").slice(1).map((x) => x.split(" ").map(Number))
);

maps.forEach((map) => {
  seeds.forEach((seed, index) => {
    for (const [destStart, sourceStart, range] of map) {
      const isInRange = seed >= sourceStart &&
        seed < (sourceStart + range);

      if (isInRange) {
        const mapOffset = destStart - sourceStart;
        seeds[index] += mapOffset;
        break;
      }
    }
  });
});

console.log(Math.min(...seeds));
