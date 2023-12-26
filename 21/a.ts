import { buildGarden, getPlotsReachableInNSteps } from "./garden.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const content = await Deno.readTextFile(__dirname + "/input.txt");
const chars = content.trim().split("\n").map((line) => line.trim().split(""));

const { garden, start } = buildGarden(chars);

const reachablePlots = getPlotsReachableInNSteps(garden, start, 64);

console.log(reachablePlots);
