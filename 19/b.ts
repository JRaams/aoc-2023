const __dirname = new URL(".", import.meta.url).pathname;
const content = await Deno.readTextFile(__dirname + "/input.txt");
const [workflowsStr] = content.trim().split("\n\n");

type Rule = {
  category: string;
  operation: string;
  value: number;
  nextName: string;
};

type Workflow = { rules: Rule[]; fallbackName: string };

type Range = { min: number; max: number };

const workflows: Record<string, Workflow> = {};
workflowsStr.split("\n").forEach((workflow) => {
  const [_, name, rulesStr] = Array.from(workflow.match(/(\w+){(.+)}/)!);
  const splitRulesStr = rulesStr.split(",");

  workflows[name] = {
    fallbackName: splitRulesStr.pop()!,
    rules: splitRulesStr.map((x) => {
      const [_, c, o, v, n] = Array.from(x.match(/(\w+)([<>])(\d+):(\w+)/)!);
      return { category: c, operation: o, value: Number(v), nextName: n };
    }),
  };
});

function combinations(
  rangesPerCategory: Record<string, Range>,
  workflowName: string,
): number {
  if (workflowName === "A") {
    let rangeCombinations = 1;
    for (const categoryRange of Object.values(rangesPerCategory)) {
      rangeCombinations *= categoryRange.max - categoryRange.min + 1;
    }
    return rangeCombinations;
  } else if (workflowName === "R") {
    return 0;
  }

  const { rules, fallbackName } = workflows[workflowName];
  let sum = 0;
  let hasUncheckedRange = false;

  for (const { category, operation, value, nextName } of rules) {
    const { min, max } = rangesPerCategory[category];
    const trueRange = operation === "<"
      ? { min, max: Math.min(value - 1, max) }
      : { min: Math.max(value + 1, min), max };
    const falseRange = operation === "<"
      ? { min: Math.max(value, min), max }
      : { min, max: Math.min(value, max) };

    if (trueRange.min <= trueRange.max) {
      const copy = structuredClone(rangesPerCategory);
      copy[category] = trueRange;
      sum += combinations(copy, nextName);
    }
    if (falseRange.min <= falseRange.max) {
      rangesPerCategory = structuredClone(rangesPerCategory);
      rangesPerCategory[category] = falseRange;
      hasUncheckedRange = true;
    } else {
      break;
    }
  }

  if (hasUncheckedRange) {
    sum += combinations(rangesPerCategory, fallbackName);
  }

  return sum;
}

console.log(
  combinations(
    {
      x: { min: 1, max: 4000 },
      m: { min: 1, max: 4000 },
      a: { min: 1, max: 4000 },
      s: { min: 1, max: 4000 },
    },
    "in",
  ),
);
