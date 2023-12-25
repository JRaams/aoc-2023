import Matrix from "../helpers/matrix.ts";
import { Vector } from "../helpers/vector.ts";

const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");
const input = lines.trim().split("\n");

type Hail = {
  p: Vector;
  v: Vector;
};

function loadHail(input: string[]): Hail[] {
  const hailStones: Hail[] = [];

  input.slice(0, 3).forEach((line) => {
    const [coords, velocities] = line.split(" @ ");
    const [px, py, pz] = coords.split(", ").map(Number);
    const [vx, vy, vz] = velocities.split(", ").map(Number);
    hailStones.push({ p: new Vector(px, py, pz), v: new Vector(vx, vy, vz) });
  });

  return hailStones;
}

const hail = loadHail(input);

const crossed0 = hail[0].p.scale(-1).cross3D(hail[0].v);
const crossed1 = hail[1].p.cross3D(hail[1].v);
const crossed2 = hail[2].p.cross3D(hail[2].v);
const line = new Vector(
  ...crossed0.add(crossed1).items,
  ...crossed0.add(crossed2).items,
);

const Q1 = hail[0].v.crossMatrix3D().subtract(hail[1].v.crossMatrix3D());
const Q2 = hail[0].v.crossMatrix3D().subtract(hail[2].v.crossMatrix3D());
const Q3 = hail[0].p.crossMatrix3D().scale(-1).add(hail[1].p.crossMatrix3D());
const Q4 = hail[0].p.crossMatrix3D().scale(-1).add(hail[2].p.crossMatrix3D());
const matrix = new Matrix(6, 6, [
  [...Q1.values[0], ...Q3.values[0]],
  [...Q1.values[1], ...Q3.values[1]],
  [...Q1.values[2], ...Q3.values[2]],
  [...Q2.values[0], ...Q4.values[0]],
  [...Q2.values[1], ...Q4.values[1]],
  [...Q2.values[2], ...Q4.values[2]],
]);

const result = line.apply(matrix.inverse());
const [x, y, z] = result.items;
console.info(Math.round(x + y + z));
