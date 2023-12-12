import { countArrangements } from "./spring.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");
let arrangementSum = 0;

input.forEach((line) => {
  const [springsStr, numbersStr] = line.split(" ");
  const numbers = numbersStr.split(",").map(Number);

  const unfoldedStrings = Array(5).fill(springsStr).join("?");
  const unfoldedNumbers = Array(5).fill(numbers).flat();

  arrangementSum += countArrangements(unfoldedStrings, unfoldedNumbers);
});

console.info(arrangementSum);
