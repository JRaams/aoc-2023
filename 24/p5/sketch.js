const lines = [
  { x: 19, y: 13, z: 30, dx: -2, dy: 1, dz: -2 },
  { x: 18, y: 19, z: 22, dx: -1, dy: -1, dz: -2 },
  { x: 20, y: 25, z: 34, dx: -2, dy: -2, dz: -4 },
  { x: 12, y: 31, z: 28, dx: -1, dy: -2, dz: -1 },
  { x: 20, y: 19, z: 15, dx: 1, dy: -5, dz: -3 },
];

const solutionLine = { x: 24, y: 13, z: 10, dx: -3, dy: 1, dz: 2 };

const intersections = [
  { x: 9, y: 18, z: 20 },
  { x: 15, y: 16, z: 16 },
  { x: 12, y: 17, z: 18 },
  { x: 6, y: 19, z: 22 },
  { x: 21, y: 14, z: 12 },
];

let showSolutionLine = false;
let showIntersections = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [-50, -50, 100],
    rotation: [0, 0, 0],
    sensitivity: 0.025,
    speed: 1,
  });
}

function keyPressed() {
  if (key === "1") {
    showSolutionLine = false;
    showIntersections = false;
  } else if (key === "2") {
    showSolutionLine = true;
    showIntersections = false;
  } else if (key === "3") {
    showSolutionLine = true;
    showIntersections = true;
  }
}

function draw() {
  background(64);
  ambientLight(200);

  const axisWeight = 1;
  const axisLength = 500;
  const lineLength = 15;

  // x-axis
  push();
  strokeWeight(axisWeight);
  stroke(255, 0, 0);
  line(-axisLength, 0, 0, axisLength, 0, 0);
  pop();
  // y-axis
  push();
  strokeWeight(axisWeight);
  stroke(0, 255, 0);
  line(0, -axisLength, 0, 0, axisLength, 0);
  pop();
  // z-axis
  push();
  strokeWeight(axisWeight);
  stroke(0, 0, 255);
  line(0, 0, -axisLength, 0, 0, axisLength);
  pop();

  // Lines
  lines.forEach((l) => {
    const x1 = l.x;
    const y1 = l.y;
    const z1 = l.z;
    const x2 = l.x + lineLength * l.dx;
    const y2 = l.y + lineLength * l.dy;
    const z2 = l.z + lineLength * l.dz;

    push();
    strokeWeight(2);
    stroke(255);

    line(x1, y1, z1, x2, y2, z2);
    pop();

    push();
    translate(x1, y1, z1);
    fill(149, 155, 247);
    box(1, 1);
    pop();
  });

  // Solution lines
  if (showSolutionLine) {
    const x1 = solutionLine.x;
    const y1 = solutionLine.y;
    const z1 = solutionLine.z;
    const x2 = solutionLine.x + lineLength * solutionLine.dx;
    const y2 = solutionLine.y + lineLength * solutionLine.dy;
    const z2 = solutionLine.z + lineLength * solutionLine.dz;

    push();
    strokeWeight(3);
    stroke(0, 255, 0);

    line(x1, y1, z1, x2, y2, z2);
    pop();

    push();
    translate(x1, y1, z1);
    fill(149, 155, 247);
    box(1, 1);
    pop();
  }

  // Intersections
  if (showIntersections) {
    intersections.forEach((i) => {
      push();
      translate(i.x, i.y, i.z);
      fill(122, 235, 186);
      box(1, 1);
      pop();
    });
  }
}
