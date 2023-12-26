import { defaultDict } from "../helpers/defaultdict.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

// 1. Get a list of unique nodes and connections between nodes (neighbours map)
const uniqueNodes = new Set<string>();
const connections = defaultDict<Set<string>>(() => new Set());

input.forEach((line) => {
  const [name, list] = line.split(": ");
  const connectionNames = list.split(" ");
  uniqueNodes.add(name);

  connectionNames.forEach((c) => {
    uniqueNodes.add(c);
    connections[name].add(c);
    connections[c].add(name);
  });
});

function getPath(start: string, end: string) {
  const queue: [string, [string, string][]][] = [
    [start, []],
  ];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const [vertex, path] = queue.splice(0, 1)[0];
    visited.add(vertex);

    for (const node of Array.from(connections[vertex])) {
      if (node === end) {
        return [...path, [vertex, node]];
      }

      if (!visited.has(node)) {
        visited.add(node);
        queue.push([node, [...path, [vertex, node]]]);
      }
    }
  }
}

const nodes = Array.from(uniqueNodes);
const visits = defaultDict(Number);

// 2. For an arbitrary large amount of times, pathfind between two random points,
// recording the amount of times a pair was visited
for (let i = 0; i < 1000; i++) {
  const randomPointA = nodes[nodes.length * Math.random() | 0];
  const randomPointB = nodes[nodes.length * Math.random() | 0];
  if (randomPointA === randomPointB) continue;

  const path = getPath(randomPointA, randomPointB);
  path?.forEach(([A, B]) => {
    const key = [A, B].sort((a, b) => a > b ? 1 : -1).join("_");
    visits[key]++;
  });
}

const sortedPairVisits = Object.entries(visits)
  .map(([node, visits]) => ({ node, visits }))
  .sort((a, b) => b.visits - a.visits);

// 3. For the top 3 pairs, remove their connections
sortedPairVisits.slice(0, 3).forEach((pair) => {
  const [a, b] = pair.node.split("_");
  connections[a].delete(b);
  connections[b].delete(a);
});

// 4. Walk the graph from each top pair's nodes to find the 2 subgroups
const [start1, start2] = sortedPairVisits[0].node.split("_");

function walk(node: string, seen: Set<string>) {
  if (seen.has(node)) return;
  seen.add(node);

  const nbs = Array.from(connections[node]);
  nbs.forEach((nb) => {
    walk(nb, seen);
  });
}

const group1 = new Set<string>();
const group2 = new Set<string>();
walk(start1, group1);
walk(start2, group2);

console.info(group1.size * group2.size);
