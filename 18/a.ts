const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split("\n");

type Pos = { y: number; x: number };

const dirToDelta: Record<string, Pos> = {
  "U": { y: -1, x: 0 },
  "D": { y: 1, x: 0 },
  "L": { y: 0, x: -1 },
  "R": { y: 0, x: 1 },
};

const trenchTiles: Pos[] = [];
let trenchTileCount = 0;
let y = 0;
let x = 0;

input.forEach((line) => {
  const [_, dir, amountStr] = Array.from(line.match(/^(\w) (\d+)/)!);
  const amount = Number(amountStr);
  trenchTileCount += amount;

  const delta = dirToDelta[dir];
  y += delta.y * amount;
  x += delta.x * amount;
  trenchTiles.push({ y, x });
});

// https://en.wikipedia.org/wiki/Shoelace_formula -> "The polygon area formulas"
let shoelaceArea = 0;
for (let i = 0; i < trenchTiles.length; i++) {
  const { x, y } = trenchTiles[i];
  const nextTile = trenchTiles[(i + 1) % trenchTiles.length];
  shoelaceArea += 0.5 * (y + nextTile.y) * (x - nextTile.x);
}

// https://en.wikipedia.org/wiki/Pick%27s_theorem
// A = i + b/2 - 1
// ShoelaceArea = InteriorPoints + BoundaryPoints/2 - 1
// InteriorPoints = BoundaryPoints/2 - 1 - ShoelaceArea
const interiorPoints = Math.abs((trenchTileCount / 2) - 1 - shoelaceArea);
const totalPoints = interiorPoints + trenchTileCount;

console.log(totalPoints);
