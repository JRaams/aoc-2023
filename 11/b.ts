import { getGalaxyPairLengthSum } from "./observatory.ts";

const lines = await Deno.readTextFile("./input.txt");
const input = lines.trim().split("\n");

console.info(getGalaxyPairLengthSum(input, 1_000_000));
