export type BroadcasterModule = {
  type: "broadcaster";
  name: string;
  outputNames: string[];
};

export type FlipFlopModule = {
  type: "flip-flop";
  name: string;
  outputNames: string[];
  state: boolean;
};

export type ConjunctionModule = {
  type: "conjunction";
  name: string;
  outputNames: string[];
  state: Record<string, boolean>;
};

export type Module = BroadcasterModule | FlipFlopModule | ConjunctionModule;

export function loadModulesMap(input: string[]) {
  const modulesMap: Record<string, Module> = {};

  input.forEach((line) => {
    const [left, right] = line.split(" -> ");
    const outputNames = right.split(", ");
    if (left === "broadcaster") {
      modulesMap["broadcaster"] = {
        type: "broadcaster",
        name: "broadcaster",
        outputNames,
      };
      return;
    }

    const name = left.slice(1);
    const type = left[0];

    if (type === "%") {
      modulesMap[name] = {
        type: "flip-flop",
        name,
        outputNames,
        state: false,
      };
    } else {
      modulesMap[name] = {
        type: "conjunction",
        name,
        outputNames,
        state: {},
      };
    }
  });

  Object.entries(modulesMap).forEach(([name, module]) => {
    module.outputNames.forEach((outputName) => {
      const module = modulesMap[outputName];
      if (module && module.type === "conjunction") {
        module.state[name] = false;
      }
    });
  });

  return modulesMap;
}
