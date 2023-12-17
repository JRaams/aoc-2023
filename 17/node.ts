import { Heap } from "../helpers/heap.ts";

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

export function moveForward(
  openSet: Heap<string>,
  grid: number[][],
  node: Node,
) {
  const { heat, y, x, dy, dx, steps } = node;
  const nextY = y + dy;
  const nextX = x + dx;

  if (!grid[nextY]?.[nextX]) return;

  openSet.insert(
    new Node(heat + grid[nextY][nextX], nextY, nextX, dy, dx, steps + 1)
      .toString(),
  );
}

const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

export function tryNeighbours(
  openSet: Heap<string>,
  grid: number[][],
  node: Node,
) {
  const { heat, y, x, dy, dx } = node;

  for (const [newDy, newDx] of DIRECTIONS) {
    const sameDir = newDy === dy && newDx === dx;
    const reverseDir = newDy === -dy && newDx === -dx;
    if (sameDir || reverseDir) continue;

    const nextY = y + newDy;
    const nextX = x + newDx;
    if (!grid[nextY]?.[nextX]) continue;

    openSet.insert(
      new Node(heat + grid[nextY][nextX], nextY, nextX, newDy, newDx, 1)
        .toString(),
    );
  }
}
