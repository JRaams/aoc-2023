import { countArrangements } from "./spring.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/test.txt");
const input = lines.trim().split("\n");
let arrangementSum = 0;

input.forEach((line) => {
  const [springsStr, numbersStr] = line.split(" ");
  const numbers = numbersStr.split(",").map(Number);

  arrangementSum += countArrangements(springsStr, numbers);
});

console.info(arrangementSum);
