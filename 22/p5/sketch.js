const bricks1 = [
  { "x1": 1, "y1": 0, "z1": 1, "x2": 1, "y2": 2, "z2": 1 },
  { "x1": 0, "y1": 0, "z1": 2, "x2": 2, "y2": 0, "z2": 2 },
  { "x1": 0, "y1": 2, "z1": 3, "x2": 2, "y2": 2, "z2": 3 },
  { "x1": 0, "y1": 0, "z1": 4, "x2": 0, "y2": 2, "z2": 4 },
  { "x1": 2, "y1": 0, "z1": 5, "x2": 2, "y2": 2, "z2": 5 },
  { "x1": 0, "y1": 1, "z1": 6, "x2": 2, "y2": 1, "z2": 6 },
  { "x1": 1, "y1": 1, "z1": 8, "x2": 1, "y2": 1, "z2": 9 },
];
const bricks2 = [
  { "x1": 1, "y1": 0, "z1": 1, "x2": 1, "y2": 2, "z2": 1 },
  { "x1": 0, "y1": 0, "z1": 2, "x2": 2, "y2": 0, "z2": 2 },
  { "x1": 0, "y1": 2, "z1": 2, "x2": 2, "y2": 2, "z2": 2 },
  { "x1": 0, "y1": 0, "z1": 3, "x2": 0, "y2": 2, "z2": 3 },
  { "x1": 2, "y1": 0, "z1": 3, "x2": 2, "y2": 2, "z2": 3 },
  { "x1": 0, "y1": 1, "z1": 4, "x2": 2, "y2": 1, "z2": 4 },
  { "x1": 1, "y1": 1, "z1": 5, "x2": 1, "y2": 1, "z2": 6 },
];

const SCALE = 55;
let bricks = structuredClone(bricks1);

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

function keyPressed() {
  if (key === "1") {
    bricks = structuredClone(bricks1);
  } else if (key === "2") {
    bricks = structuredClone(bricks2);
  }
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

  // Bricks
  const step = 360 / bricks.length;
  bricks.forEach((brick, index) => {
    for (let x = brick.x1; x <= brick.x2; x++) {
      for (let y = brick.y1; y <= brick.y2; y++) {
        for (let z = brick.z1; z <= brick.z2; z++) {
          push();
          translate(x * SCALE, -z * SCALE, y * SCALE);
          fill(`hsl(${Math.floor(index * step)}, 100%, 50%)`);
          box(SCALE, SCALE);
          pop();
        }
      }
    }
  });
}
