const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

const stringToNumbers: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

function solve(input: string[]): number {
  let sum = 0;

  input.forEach((line) => {
    const first = stringToNumbers[
      line.match(/\d|one|two|three|four|five|six|seven|eight|nine/)!.at(0)!
    ];
    const last = stringToNumbers[
      line.match(/\d|one|two|three|four|five|six|seven|eight|nine/)!.at(-1)!
    ];

    sum += Number(`${first}${stringToNumbers[last]}`);
  });

  return sum;
}

console.info(solve(input));
