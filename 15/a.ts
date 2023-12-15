const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split(",");

function hashString(input: string): number {
  let result = 0;
  for (let i = 0; i < input.length; i++) {
    const ascii = input.charCodeAt(i);
    result += ascii;
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
