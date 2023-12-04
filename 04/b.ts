const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

const cards = new Array(input.length).fill(1);

input.forEach((line, index) => {
  const [winningNumbers, cardNumbers] = line
    .split(": ")[1]
    .split(" | ")
    .map((x) => x.split(" ").filter((y) => y));

  const intersectionCount = winningNumbers.filter((x) =>
    cardNumbers.includes(x)
  ).length;

  for (
    let i = index;
    i < index + intersectionCount && i < input.length;
    i++
  ) {
    cards[i + 1] += cards[index];
  }
});

console.info(Object.values(cards).reduce((a, b) => a + b));
