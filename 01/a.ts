const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.split("\n").filter((l) => l);

let sum = 0;

input.forEach((line) => {
  const numbers = Array.from(line.matchAll(/\d/g));
  sum += Number(`${numbers.at(0)}${numbers.at(-1)}`);
});

console.info(sum);
