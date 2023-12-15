const lines = await Deno.readTextFile("./input.txt");
const input: string[] = lines.trim().split(",");

type Box = { label: string; focalLength: string }[];
type Boxes = Box[];

function hashString(input: string): number {
  let result = 0;

  for (let i = 0; i < input.length; i++) {
    const ascii = input.charCodeAt(i);
    result += ascii;
    result *= 17;
    result = result % 256;
  }

  return result;
}

function loadBoxes(input: string[]): Boxes {
  const boxes: Boxes = Array.from(Array(256), () => []);

  input.forEach((part) => {
    if (part.endsWith("-")) {
      const label = part.slice(0, -1);
      const hash = hashString(label);
      boxes[hash] = boxes[hash].filter((x) => x.label !== label);
      return;
    }

    const [label, focalLength] = part.split("=");
    const hash = hashString(label);

    const existingLens = boxes[hash].find((x) => x.label === label);
    if (existingLens) {
      existingLens.focalLength = focalLength;
    } else {
      boxes[hash].push({ label, focalLength });
    }
  });

  return boxes;
}

const boxes = loadBoxes(input);
let sum = 0;

boxes.forEach((box, boxIndex) => {
  box.forEach((slot, slotIndex) => {
    sum += (boxIndex + 1) * (slotIndex + 1) * Number(slot.focalLength);
  });
});

console.log(sum);
