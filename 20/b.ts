import { lcmBulk } from "../helpers/math.ts";
import { loadModulesMap } from "./module.ts";

const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split("\n");

const modulesMap = loadModulesMap(input);

const lastConjunctionName =
  Object.entries(modulesMap).find(([_, module]) =>
    module.outputNames.includes("rx")
  )![0];

let lastConjunctionInputs = Object.entries(modulesMap)
  .filter(([_, module]) => module.outputNames.includes(lastConjunctionName))
  .map((x) => x[0]);

const cycles: Record<string, number> = {};

outer: for (let i = 1;; i++) {
  const pulseQueue = modulesMap["broadcaster"].outputNames
    .map((x) => ({
      input: "broadcaster",
      output: x,
      pulse: false,
    }));

  while (pulseQueue.length > 0) {
    const { input, output, pulse } = pulseQueue.splice(0, 1)[0];
    const module = modulesMap[output];
    if (module === undefined) continue;

    if (module.name === lastConjunctionName && pulse === true) {
      lastConjunctionInputs = lastConjunctionInputs.filter((x) => x !== input);
      cycles[input] ??= i;

      if (lastConjunctionInputs.length === 0) {
        const rxLowPulse = lcmBulk(...Object.values(cycles));
        console.info({ cycles, rxLowPulse });
        break outer;
      }
    }

    if (module.type === "flip-flop" && pulse === false) {
      module.state = !module.state;
      module.outputNames.forEach((n) => {
        pulseQueue.push({
          input: module.name,
          output: n,
          pulse: module.state,
        });
      });
    } else if (module.type === "conjunction") {
      module.state[input] = pulse;
      const nextPulse = !Object.values(module.state).every((x) => x === true);

      module.outputNames.forEach((n) => {
        pulseQueue.push({ input: module.name, output: n, pulse: nextPulse });
      });
    }
  }
}
