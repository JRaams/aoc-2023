import { buildGarden, getPlotsReachableInNSteps } from "./garden.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const content = await Deno.readTextFile(__dirname + "/input.txt");
const chars = content.trim().split("\n").map((line) => line.trim().split(""));

const { garden, start } = buildGarden(chars);

const steps = 26501365;
const gardenSize = garden.length; // 131
const range = steps % gardenSize; // 65

// https://mathworld.wolfram.com/LagrangeInterpolatingPolynomial.html
function lagrangeInterpolation(X: number, points: { y: number; x: number }[]) {
  let result = 0;

  for (let j = 0; j < points.length; j++) {
    let product = points[j].y;

    for (let k = 0; k < points.length; k++) {
      if (j !== k) {
        product = product * (X - points[k].x) / (points[j].x - points[k].x);
      }
    }

    result += product;
  }

  return result;
}

const points = [range, range + gardenSize, range + gardenSize * 2]
  .map((x) => ({ x, y: getPlotsReachableInNSteps(garden, start, x) }));

console.info(points);
console.info(lagrangeInterpolation(steps, points));
