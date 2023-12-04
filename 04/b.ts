import { defaultDict } from "../helpers/defaultdict.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

const cardCounts = defaultDict(() => 1);

input.forEach((line, index) => {
  const number = index + 1;
  cardCounts[number]; // Init hack

  const [winningNumbers, cardNumbers] = line
    .split(": ")[1]
    .split(" | ")
    .map((x) => x.split(" ").filter((y) => y));

  const intersectionCount = winningNumbers.filter((x) =>
    cardNumbers.includes(x)
  ).length;

  for (
    let i = number;
    i < number + intersectionCount && i < input.length;
    i++
  ) {
    cardCounts[i + 1] += cardCounts[number];
  }
});

console.info(Object.values(cardCounts).reduce((a, b) => a + b));
