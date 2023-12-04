const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

let totalPoints = 0;

input.forEach((line) => {
  const [winningNumbers, cardNumbers] = line
    .split(": ")[1]
    .split(" | ")
    .map((x) => x.split(" ").filter((y) => y));

  const intersectionCount = winningNumbers.filter((x) =>
    cardNumbers.includes(x)
  ).length;

  if (intersectionCount > 0) {
    totalPoints += Math.pow(2, intersectionCount - 1);
  }
});

console.info(totalPoints);
