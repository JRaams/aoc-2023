import { loadModulesMap } from "./module.ts";

const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split("\n");

const modulesMap = loadModulesMap(input);
let lowPulses = 0;
let highPulses = 0;

function pushButton() {
  lowPulses++;

  const pulseQueue = modulesMap["broadcaster"].outputNames
    .map((x) => ({
      input: "broadcaster",
      output: x,
      pulse: false,
    }));

  while (pulseQueue.length > 0) {
    const { input, output, pulse } = pulseQueue.splice(0, 1)[0];

    if (pulse) {
      highPulses++;
    } else {
      lowPulses++;
    }

    const module = modulesMap[output];
    if (module === undefined) continue;

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

for (let i = 0; i < 1000; i++) {
  pushButton();
}

console.info(lowPulses * highPulses);
