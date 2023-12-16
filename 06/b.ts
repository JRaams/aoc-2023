const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");

const [timeStr, distStr] = lines.trim().split("\n");
const time = +timeStr.split(":")[1].replaceAll(" ", "");
const recordDistance = +distStr.split(":")[1].replaceAll(" ", "");

const D = Math.sqrt(time * time - 4 * recordDistance - 1);
const x1 = Math.ceil((time - D) / 2);
const x2 = Math.floor((time + D) / 2);
const waysToBeatTheRace = x2 - x1 + 1;

console.info(waysToBeatTheRace);

// distance = (time - buttonTime) * buttonTime
// d = (t - B) * B
// d = t * B - B^2
// B^2 - t * B + d = 0

// (-b [+/-] sqrt(b*b - 4ac)) / 2a
// a = 1, b = -time, c = recordDistance

// (--time [+/-] sqrt(time * time - 4 * recordDistance)) / 2
// D = sqrt(time * time - 4 * recordDistance) (Subtract 1 for integer rounding logic)
// x1 = (time - D) / 2
// x2 = (time + D) / 2
