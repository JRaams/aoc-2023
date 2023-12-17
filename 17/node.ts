export class Node {
  heat: number;
  y: number;
  x: number;
  dy: number;
  dx: number;
  steps: number;

  constructor(
    heat: number,
    y: number,
    x: number,
    dy: number,
    dx: number,
    steps: number,
  ) {
    this.heat = heat;
    this.y = y;
    this.x = x;
    this.dy = dy;
    this.dx = dx;
    this.steps = steps;
  }

  public hash(): string {
    return `${this.y}_${this.x}_${this.dy}_${this.dx}_${this.steps}`;
  }

  public compare(other: Node): number {
    if (this.heat === other.heat) return 0;
    return this.heat > other.heat ? 1 : -1;
  }

  public toString(): string {
    return JSON.stringify(this);
  }

  public static fromString(input: string): Node {
    const { heat, y, x, dy, dx, steps } = JSON.parse(input);
    return new Node(heat, y, x, dy, dx, steps);
  }
}

export function nodeStringComparer(a: string, b: string): number {
  const nodeA = Node.fromString(a);
  const nodeB = Node.fromString(b);
  return nodeA.compare(nodeB);
}
