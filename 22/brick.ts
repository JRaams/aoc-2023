export class Brick {
  index: number;
  xMin: number;
  yMin: number;
  zMin: number;
  xMax: number;
  yMax: number;
  zMax: number;
  supports: Set<Brick>;
  supportedBy: Set<Brick>;

  constructor(line: string, index: number) {
    const [start, end] = line.split("~");
    const [x1, y1, z1] = start.split(",").map(Number);
    const [x2, y2, z2] = end.split(",").map(Number);
    this.index = index;
    this.xMin = x1;
    this.xMax = x2;
    this.yMin = y1;
    this.yMax = y2;
    this.zMin = z1;
    this.zMax = z2;
    this.supports = new Set();
    this.supportedBy = new Set();
  }
}

export function drop(bricks: Brick[]): void {
  bricks.forEach((brick, index) => {
    let possibleZ = 1;
    bricks.slice(0, index).forEach((check) => {
      const x1 = Math.max(brick.xMin, check.xMin);
      const x2 = Math.min(brick.xMax, check.xMax);
      const y1 = Math.max(brick.yMin, check.yMin);
      const y2 = Math.min(brick.yMax, check.yMax);

      if (x1 <= x2 && y1 <= y2) {
        possibleZ = Math.max(possibleZ, check.zMax + 1);
        check.supports.add(brick);
        brick.supportedBy.add(check);
      }
      brick.zMax -= brick.zMin - possibleZ;
      brick.zMin = possibleZ;
    });
  });

  bricks.sort((a, b) => a.zMin - b.zMin);

  bricks.forEach((b) => {
    b.supportedBy = new Set(
      Array.from(b.supportedBy).filter((x) => b.zMin - x.zMax === 1),
    );

    b.supports = new Set(
      Array.from(b.supports).filter((x) => x.zMin - b.zMax === 1),
    );
  });
}

export function getUnsafe(bricks: Brick[]) {
  const unsafe = new Set<Brick>();

  bricks.forEach((b) => {
    if (b.supportedBy.size === 1) {
      unsafe.add(Array.from(b.supportedBy)[0]);
    }
  });

  return unsafe;
}
