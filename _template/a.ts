const lines: string = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);
