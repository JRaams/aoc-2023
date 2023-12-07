import { buildHandList, countTotalWinnings, sortHands } from "./hand.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

const hands = buildHandList(input, true);
const sortedHands = sortHands(hands);
const totalWinnings = countTotalWinnings(sortedHands);

console.log(totalWinnings);
