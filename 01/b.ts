const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

function solve(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    const newLine = line
      .replaceAll("one", "o1ne")
      .replaceAll("two", "t2wo")
      .replaceAll("three", "t3hree")
      .replaceAll("four", "f4our")
      .replaceAll("five", "f5ive")
      .replaceAll("six", "s6ix")
      .replaceAll("seven", "s7even")
      .replaceAll("eight", "e8ight")
      .replaceAll("nine", "n9ine");

    const first = newLine.match(/\d/)!.at(0);
    const last = newLine.match(/\d/g)!.at(-1);

    sum += Number(`${first}${last}`);
  });

  return sum;
}

console.info(solve(input));
