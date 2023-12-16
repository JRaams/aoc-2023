import { getGalaxyPairLengthSum } from "./observatory.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

console.info(getGalaxyPairLengthSum(input, 2));
