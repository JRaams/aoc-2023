// const cubes = [
//   { x: 1, y: 0, z: 1, brick: 0 },
//   { x: 1, y: 1, z: 1, brick: 0 },
//   { x: 1, y: 2, z: 1, brick: 0 },
//   { x: 0, y: 0, z: 2, brick: 1 },
//   { x: 1, y: 0, z: 2, brick: 1 },
//   { x: 2, y: 0, z: 2, brick: 1 },
//   { x: 0, y: 2, z: 3, brick: 2 },
//   { x: 1, y: 2, z: 3, brick: 2 },
//   { x: 2, y: 2, z: 3, brick: 2 },
//   { x: 0, y: 0, z: 4, brick: 3 },
//   { x: 0, y: 1, z: 4, brick: 3 },
//   { x: 0, y: 2, z: 4, brick: 3 },
//   { x: 2, y: 0, z: 5, brick: 4 },
//   { x: 2, y: 1, z: 5, brick: 4 },
//   { x: 2, y: 2, z: 5, brick: 4 },
//   { x: 0, y: 1, z: 6, brick: 5 },
//   { x: 1, y: 1, z: 6, brick: 5 },
//   { x: 2, y: 1, z: 6, brick: 5 },
//   { x: 1, y: 1, z: 8, brick: 6 },
//   { x: 1, y: 1, z: 9, brick: 6 },
// ];

const cubes = [
  { x: 1, y: 0, z: 0, brick: 0 },
  { x: 1, y: 1, z: 0, brick: 0 },
  { x: 1, y: 2, z: 0, brick: 0 },
  { x: 0, y: 0, z: 1, brick: 1 },
  { x: 1, y: 0, z: 1, brick: 1 },
  { x: 2, y: 0, z: 1, brick: 1 },
  { x: 0, y: 2, z: 1, brick: 2 },
  { x: 1, y: 2, z: 1, brick: 2 },
  { x: 2, y: 2, z: 1, brick: 2 },
  { x: 0, y: 0, z: 2, brick: 3 },
  { x: 0, y: 1, z: 2, brick: 3 },
  { x: 0, y: 2, z: 2, brick: 3 },
  { x: 2, y: 0, z: 2, brick: 4 },
  { x: 2, y: 1, z: 2, brick: 4 },
  { x: 2, y: 2, z: 2, brick: 4 },
  { x: 0, y: 1, z: 3, brick: 5 },
  { x: 1, y: 1, z: 3, brick: 5 },
  { x: 2, y: 1, z: 3, brick: 5 },
  { x: 1, y: 1, z: 4, brick: 6 },
  { x: 1, y: 1, z: 5, brick: 6 },
];
const bricks = cubes.at(-1).brick + 1;

const SCALE = 55;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [-400, -200, -200],
    rotation: [0.4, 0.3, 0],
    sensitivity: 0.05,
    speed: 10,
  });
}

function draw() {
  background(64);
  ambientLight(200);

  // Bottom plane
  push();
  noStroke();
  fill("#0f0f23");
  rotateX((90 * Math.PI) / 180);
  translate(0, 0, -0.5 * SCALE);
  plane(1000, 1000);
  pop();

  // Cubes
  const step = 360 / bricks;
  cubes.forEach((cube) => {
    push();
    translate(cube.x * SCALE, -cube.z * SCALE, cube.y * SCALE);
    fill(`hsl(${Math.floor(cube.brick * step)}, 100%, 50%)`);
    box(50, 50);
    pop();
  });
}
