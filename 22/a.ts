const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

class Brick {
  id: number;
  xMin: number;
  yMin: number;
  zMin: number;
  xMax: number;
  yMax: number;
  zMax: number;
  supportedBy: Set<Brick>;

  constructor(line: string, id: number) {
    const [start, end] = line.split("~");
    const [x1, y1, z1] = start.split(",").map(Number);
    const [x2, y2, z2] = end.split(",").map(Number);
    this.id = id;
    this.xMin = x1;
    this.xMax = x2;
    this.yMin = y1;
    this.yMax = y2;
    this.zMin = z1;
    this.zMax = z2;
    this.supportedBy = new Set();
  }
}

const bricks = input.map((x, i) => new Brick(x, i));
bricks.sort((a, b) => a.zMin - b.zMin);

bricks.forEach((brick, index) => {
  let possibleZ = 1;
  bricks.slice(0, index).forEach((check) => {
    const x1 = Math.max(brick.xMin, check.xMin);
    const x2 = Math.min(brick.xMax, check.xMax);
    const y1 = Math.max(brick.yMin, check.yMin);
    const y2 = Math.min(brick.yMax, check.yMax);

    if (x1 <= x2 && y1 <= y2) {
      possibleZ = Math.max(possibleZ, check.zMax + 1);
      brick.supportedBy.add(check);
    }
    brick.zMax -= brick.zMin - possibleZ;
    brick.zMin = possibleZ;
  });
});

bricks.sort((a, b) => a.zMin - b.zMin);

const unsafe = new Set<number>();
bricks.forEach((b) => {
  const supporters = Array.from(b.supportedBy).filter((s) =>
    b.zMin - s.zMax === 1
  );
  if (supporters.length === 1) {
    unsafe.add(supporters[0].id);
  }
});

console.info(bricks.length - unsafe.size);
