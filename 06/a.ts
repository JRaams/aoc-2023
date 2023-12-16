const __dirname = new URL(".", import.meta.url).pathname;
const lines = await Deno.readTextFile(__dirname + "/input.txt");

const [timeStr, distStr] = lines.trim().split("\n");
const times = Array.from(timeStr.matchAll(/\d+/g)).map(Number);
const dists = Array.from(distStr.matchAll(/\d+/g)).map(Number);

let sum = 1;

times.forEach((time, timeIndex) => {
  const record = dists[timeIndex];
  let waysToBeat = 0;

  for (let i = 0; i < time; i++) {
    const raceDuration = time - i;
    const distance = i * raceDuration;
    if (distance > record) {
      waysToBeat++;
    }
  }

  sum *= waysToBeat;
});

console.info(sum);
