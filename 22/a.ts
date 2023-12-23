const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

type Cube = {
  brick: number;
  x: number;
  y: number;
  z: number;
};

type Brick = {
  id: number;
  cubes: Cube[];
  lowestZ: number;
  highestZ: number;
  supports: Set<Brick>;
  isRooted: boolean;
};

const bricks: Brick[] = [];

input.forEach((line, lineIndex) => {
  const brick: Brick = {
    id: lineIndex,
    cubes: [],
    lowestZ: 0,
    highestZ: 0,
    supports: new Set(),
    isRooted: false,
  };
  bricks.push(brick);

  const [start, end] = line.split("~");
  const [x1, y1, z1] = start.split(",").map(Number);
  const [x2, y2, z2] = end.split(",").map(Number);

  for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
        brick.cubes.push({ x, y, z, brick: lineIndex });
      }
    }
  }

  brick.lowestZ = Math.min(...brick.cubes.map((x) => x.z));
  brick.highestZ = Math.max(...brick.cubes.map((x) => x.z));
  brick.isRooted = brick.lowestZ === 1;
});

bricks.sort((a, b) => a.lowestZ - b.lowestZ);
// bricks.map((x) => x.cubes).flat().forEach((x) =>
//   console.log(JSON.stringify(x) + ",")
// );

let flyingBricks = bricks.slice().filter((x) => x.lowestZ > 1);
while (flyingBricks.length > 0) {
  flyingBricks.forEach((fb) => {
    const bricksBelow = bricks.filter((x) =>
      x.id !== fb.id && x.highestZ <= fb.lowestZ
    );

    const hits: Brick[] = [];
    bricksBelow.forEach((other) => {
      for (const fbc of fb.cubes) {
        for (const oc of other.cubes) {
          if (fbc.x === oc.x && fbc.y === oc.y && fbc.z - 1 === oc.z) {
            hits.push(other);
            if (other.isRooted) {
              fb.supports.add(other);
              // other.supports.add(fb);
              fb.isRooted = true;
            }
            break;
          }
        }
      }
    });

    if (hits.length === 0) {
      fb.cubes.forEach((c) => {
        c.z--;
      });

      fb.lowestZ = Math.min(...fb.cubes.map((x) => x.z));
      fb.highestZ = Math.max(...fb.cubes.map((x) => x.z));
      if (fb.lowestZ === 1) {
        fb.isRooted = true;
      }
    }
  });

  flyingBricks = flyingBricks.filter((x) => !x.isRooted);
}

// bricks.map((x) => x.cubes).flat().forEach((x) =>
//   console.log(JSON.stringify(x) + ",")
// );

// console.info(bricks.map((x) => x.cubes).flat());
// console.info(bricks);

const unsafe = new Set<number>();

bricks.forEach((b) => {
  if (b.supports.size === 1) {
    unsafe.add(Array.from(b.supports)[0].id);
  }
});

console.info(bricks.length - unsafe.size);
