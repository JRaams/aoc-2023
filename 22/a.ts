import { Brick, drop, getUnsafe } from "./brick.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

const bricks = input.map((x, i) => new Brick(x, i));

bricks.sort((a, b) => a.zMin - b.zMin);

drop(bricks);

const unsafe = getUnsafe(bricks);

console.info(bricks.length - unsafe.size);
