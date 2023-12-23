import { Brick, drop, getUnsafe } from "./brick.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

const bricks = input.map((line, i) => new Brick(line, i));

bricks.sort((a, b) => a.zMin - b.zMin);

drop(bricks);

let count = 0;
const unsafe = getUnsafe(bricks);

Array.from(unsafe).forEach((ub) => {
  // console.info("ub", ub.index);
  const queue: Brick[] = Array.from(ub.supports);
  const seen = new Set<number>();
  const fallen = new Set<number>([ub.index]);

  while (queue.length > 0) {
    const item = queue.splice(0, 1)[0];
    // console.info(
    //   "item",
    //   item.index,
    //   Array.from(item.supportedBy).map((x) => x.index),
    // );
    // console.info("fallen", fallen);
    if (Array.from(item.supportedBy).every((x) => fallen.has(x.index))) {
      count++;
      fallen.add(item.index);
    }

    Array.from(item.supports).forEach((s) => {
      if (seen.has(s.index)) return;
      seen.add(s.index);
      queue.push(s);
    });

    queue.sort((a, b) => a.zMin - b.zMin);
  }
});

// 93788 too low
// 102770 correct
// 127620 too high
console.info(count);
