const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split("\n");

type FlipFlopModule = {
  type: "flip-flop";
  name: string;
  outputNames: string[];
  state: boolean;
};

type ConjunctionModule = {
  type: "conjunction";
  name: string;
  outputNames: string[];
  state: Record<string, boolean>;
};

type Module = FlipFlopModule | ConjunctionModule;

const namedModules: Record<string, Module> = {};
let broadcastOutputs: string[] = [];

input.forEach((line) => {
  const [left, right] = line.split(" -> ");
  const outputNames = right.split(", ");
  if (left === "broadcaster") {
    broadcastOutputs = outputNames;
    return;
  }

  const name = left.slice(1);
  const type = left[0];

  if (type === "%") {
    namedModules[name] = { type: "flip-flop", name, outputNames, state: false };
  } else {
    namedModules[name] = { type: "conjunction", name, outputNames, state: {} };
  }
});

Object.entries(namedModules).forEach(([name, module]) => {
  module.outputNames.forEach((outputName) => {
    const module = namedModules[outputName];
    if (module && module.type === "conjunction") {
      module.state[name] = false;
    }
  });
});

let lowPulses = 0;
let highPulses = 0;

type Pulse = {
  origin: string;
  target: string;
  pulse: boolean;
};

function pushButton() {
  lowPulses++;

  const pulseQueue: Pulse[] = broadcastOutputs.map((x) => ({
    origin: "broadcaster",
    target: x,
    pulse: false,
  }));

  while (pulseQueue.length > 0) {
    const { origin, target, pulse } = pulseQueue.splice(0, 1)[0];

    if (pulse) {
      highPulses++;
    } else {
      lowPulses++;
    }

    const module = namedModules[target];
    if (module === undefined) continue;

    if (module.type === "flip-flop") {
      if (pulse === false) {
        module.state = !module.state;
        module.outputNames.forEach((n) => {
          pulseQueue.push({
            origin: module.name,
            target: n,
            pulse: module.state,
          });
        });
      }
    } else if (module.type === "conjunction") {
      module.state[origin] = pulse;
      const nextPulse = !Object.values(module.state).every((x) => x === true);

      module.outputNames.forEach((n) => {
        pulseQueue.push({ origin: module.name, target: n, pulse: nextPulse });
      });
    }
  }
}

for (let i = 0; i < 1000; i++) {
  pushButton();
}

console.info(lowPulses * highPulses);
