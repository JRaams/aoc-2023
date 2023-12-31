const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input: string[] = lines.trim().split(",");

function hashString(input: string): number {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result += input.charCodeAt(i);
    result *= 17;
    result = result % 256;
  }
  return result;
}

let sum = 0;
input.forEach((step) => {
  sum += hashString(step);
});

console.info(sum);
