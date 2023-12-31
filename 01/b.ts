const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.split("\n").filter((l) => l);

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

  const numbers = Array.from(newLine.matchAll(/\d/g));
  sum += Number(`${numbers.at(0)}${numbers.at(-1)}`);
});

console.info(sum);
