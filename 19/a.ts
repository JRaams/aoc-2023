const __dirname = new URL(".", import.meta.url).pathname;
const content = await Deno.readTextFile(__dirname + "/input.txt");
const [workflowsStr, ratingsStr] = content.trim().split("\n\n");

const workflows: Record<string, string[]> = {};
workflowsStr.split("\n").forEach((workflow) => {
  const [_, name, rulesStr] = Array.from(workflow.match(/(\w+){(.+)}/)!);
  workflows[name] = rulesStr.split(",");
});

function isAccepted(vals: Record<string, number>): boolean {
  let workflowName = "in";
  while (true) {
    if (workflowName === "A") {
      return true;
    } else if (workflowName === "R") {
      return false;
    }

    const workflow = workflows[workflowName];
    for (const rule of workflow) {
      if (rule[1] === "<") {
        const [conditionStr, nextName] = rule.split(":");
        const [conditionName, conditionVal] = conditionStr.split("<");
        if (vals[conditionName] < Number(conditionVal)) {
          workflowName = nextName;
          break;
        }
      } else if (rule[1] === ">") {
        const [conditionStr, nextName] = rule.split(":");
        const [conditionName, conditionVal] = conditionStr.split(">");
        if (vals[conditionName] > Number(conditionVal)) {
          if (nextName === "R") {
            return false;
          } else {
            workflowName = nextName;
            break;
          }
        }
      } else {
        workflowName = rule;
        break;
      }
    }
  }
}

let acceptedSum = 0;
ratingsStr.split("\n").forEach((rating) => {
  const [_, x, m, a, s] = Array.from(
    rating.match(/x=(\d+),m=(\d+),a=(\d+),s=(\d+)/)!,
  ).map(Number);

  const accepted = isAccepted({ x, m, a, s });
  if (accepted) {
    acceptedSum += x + m + a + s;
  }
});

console.log(acceptedSum);
