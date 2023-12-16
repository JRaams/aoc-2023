import { buildHandList, countTotalWinnings, sortHands } from "./hand.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.split("\n").filter((l) => l);

const hands = buildHandList(input, true);
const sortedHands = sortHands(hands);
const totalWinnings = countTotalWinnings(sortedHands);

console.log(totalWinnings);
