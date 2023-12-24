const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

type Hail = {
  px: number;
  py: number;
  vx: number;
  vy: number;

  equation: string;
  a: number;
  b: number;
};

function loadHail(input: string[]): Hail[] {
  const hailStones: Hail[] = [];

  input.forEach((line) => {
    const [coords, velocities] = line.split(" @ ");
    const [px, py, _pz] = coords.split(", ").map(Number);
    const [vx, vy, _vz] = velocities.split(", ").map(Number);

    // y = ax + b
    const a = vy / vx;
    const b = py - (px / (vx / vy));
    const equation = `y = ${a}x ${b > 0 ? "+" : "-"} ${b}`;

    hailStones.push({ px, py, vx, vy, a, b, equation });
  });

  return hailStones;
}

const hail = loadHail(input);
let intersectionsInTestArea = 0;
const AREA_MIN = 200_000_000_000_000;
const AREA_MAX = 400_000_000_000_000;
// const AREA_MIN = 7;
// const AREA_MAX = 27;

for (let i = 0; i < hail.length; i++) {
  const current = hail[i];
  for (let j = i + 1; j < hail.length; j++) {
    const other = hail[j];

    const a = current.a - other.a;
    if (a === 0) {
      continue;
    }

    const b = other.b - current.b;
    const x = b / a;
    const y = current.a * x + current.b;

    // Looking forward in time
    if (current.vx > 0) {
      if (x < current.px) continue;
    } else {
      if (x > current.px) continue;
    }
    if (other.vx > 0) {
      if (x < other.px) continue;
    } else {
      if (x > other.px) continue;
    }

    if (
      x >= AREA_MIN && x <= AREA_MAX &&
      y >= AREA_MIN && y <= AREA_MAX
    ) {
      intersectionsInTestArea++;
    }
  }
}

// 10031 too low
// 14799
// 17967 too high
console.info(intersectionsInTestArea);
