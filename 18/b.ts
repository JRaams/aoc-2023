const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split("\n");

type Pos = { y: number; x: number };

const digitToDelta: Record<string, Pos> = {
  "0": { y: 0, x: 1 }, // Right
  "1": { y: 1, x: 0 }, // Down
  "2": { y: 0, x: -1 }, // Left
  "3": { y: -1, x: 0 }, // Up
};

const trenchTiles: Pos[] = [];
let trenchTileCount = 0;
let y = 0;
let x = 0;

input.forEach((line) => {
  const [_, color] = Array.from(line.match(/#(.+)\)$/)!);

  const distance = parseInt(color.slice(0, -1), 16);
  const dirDigit = color.slice(-1);
  trenchTileCount += distance;

  const delta = digitToDelta[dirDigit];
  y += delta.y * distance;
  x += delta.x * distance;
  trenchTiles.push({ y, x });
});

let shoelaceArea = 0;
for (let i = 0; i < trenchTiles.length; i++) {
  const { x, y } = trenchTiles[i];
  const nextTile = trenchTiles[(i + 1) % trenchTiles.length];
  shoelaceArea += 0.5 * (y + nextTile.y) * (x - nextTile.x);
}

const interiorPoints = Math.abs((trenchTileCount / 2) - 1 - shoelaceArea);
const totalPoints = interiorPoints + trenchTileCount;

console.log(totalPoints);
