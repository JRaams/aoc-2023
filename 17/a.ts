import { Heap } from "../helpers/heap.ts";
import { Node, nodeStringComparer } from "./node.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/test.txt");
const input = lines.trim().split("\n").map((x) =>
  x.trim().split("").map(Number)
);

const TARGET_Y = input.length - 1;
const TARGET_X = input[0].length - 1;
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
  const { heat, y, x, dy, dx, steps } = node;

  if (y === TARGET_Y && x == TARGET_X) {
    console.info("reached target!", heat);
    break;
  }

  if (visited.has(node.hash())) continue;
  visited.add(node.hash());

  if (steps < 3) {
    const nextY = y + dy;
    const nextX = x + dx;

    if (input[nextY]?.[nextX]) {
      openSet.insert(
        new Node(heat + input[nextY][nextX], nextY, nextX, dy, dx, steps + 1)
          .toString(),
      );
    }
  }

  for (const [newDy, newDx] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
    const sameDir = newDy === dy && newDx === dx;
    const reverseDir = newDy === -dy && newDx === -dx;
    if (sameDir || reverseDir) continue;

    const nextY = y + newDy;
    const nextX = x + newDx;
    if (!input[nextY]?.[nextX]) continue;

    openSet.insert(
      new Node(heat + input[nextY][nextX], nextY, nextX, newDy, newDx, 1)
        .toString(),
    );
  }
}
