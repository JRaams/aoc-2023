import { countArrangements } from "./spring.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");
let arrangementSum = 0;

input.forEach((line) => {
  const [springsStr, numbersStr] = line.split(" ");
  const numbers = numbersStr.split(",").map(Number);

  arrangementSum += countArrangements(springsStr, numbers);
});

console.info(arrangementSum);
