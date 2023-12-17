import { Heap } from "../helpers/heap.ts";
import {
  moveForward,
  Node,
  nodeStringComparer,
  tryNeighbours,
} from "./node.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/test.txt");
const grid = lines.trim().split("\n").map((x) =>
  x.trim().split("").map(Number)
);

const TARGET_Y = grid.length - 1;
const TARGET_X = grid[0].length - 1;
const visited = new Set<string>();
const openSet = new Heap<string>(
  nodeStringComparer,
  [
    new Node(0, 0, 0, 0, 1, 0).toString(), // Initial position, heading east
    new Node(0, 0, 0, 1, 0, 0).toString(), // Initial position, heading south
  ],
);

while (!openSet.isEmpty()) {
  const node = Node.fromString(openSet.pop()!);
  const { heat, y, x, steps } = node;

  if (y === TARGET_Y && x == TARGET_X) {
    console.info("reached target!", heat);
    break;
  }

  if (visited.has(node.hash())) continue;
  visited.add(node.hash());

  if (steps < 3) {
    moveForward(openSet, grid, node);
  }

  tryNeighbours(openSet, grid, node);
}
