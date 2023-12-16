const lines = await Deno.readTextFile("./input.txt");
const grid = lines.trim().split("\n").map((x) => x.trim().split(""));

enum Direction {
  North,
  West,
  South,
  East,
}

function getDirectionCoords(direction: Direction) {
  switch (direction) {
    case Direction.North:
      return [-1, 0];
    case Direction.West:
      return [0, -1];
    case Direction.South:
      return [1, 0];
    case Direction.East:
      return [0, 1];
  }
}

// const visited: boolean[][] = Array.from(
//   Array(grid.length),
//   () => Array(grid[0].length).fill(false),
// );

const energizedTileCoords = new Set<string>();
const uniqueBounces = new Set<string>();

function moveBeam(
  grid: string[][],
  y: number,
  x: number,
  direction: Direction,
) {
  if (grid[y] === undefined || grid[y][x] === undefined) return;
  const key = `${y}_${x}_${direction}`;
  if (uniqueBounces.has(key)) return;
  uniqueBounces.add(key);
  energizedTileCoords.add(`${y}_${x}`);

  const cell = grid[y][x];
  console.info(y, x, cell, ["North", "West", "South", "East"][direction]);

  const [dy, dx] = getDirectionCoords(direction);
  const nextY = y + dy;
  const nextX = x + dx;

  switch (cell) {
    case ".": {
      moveBeam(grid, nextY, nextX, direction);
      break;
    }
    case "|": {
      if (direction === Direction.East || direction === Direction.West) {
        console.info("\n| north:");
        moveBeam(grid, y - 1, x, Direction.North);
        console.info("\n| south:");
        moveBeam(grid, y + 1, x, Direction.South);
      } else {
        moveBeam(grid, nextY, nextX, direction);
      }
      break;
    }
    case "-": {
      if (direction === Direction.North || direction === Direction.South) {
        console.info("\n- west:");
        moveBeam(grid, y, x - 1, Direction.West);
        console.info("\n- east:");
        moveBeam(grid, y, x + 1, Direction.East);
      } else {
        moveBeam(grid, nextY, nextX, direction);
      }
      break;
    }
    case "/": {
      if (direction === Direction.North) {
        moveBeam(grid, y, x + 1, Direction.East);
      } else if (direction === Direction.East) {
        moveBeam(grid, y - 1, x, Direction.North);
      } else if (direction === Direction.South) {
        moveBeam(grid, y, x - 1, Direction.West);
      } else if (direction === Direction.West) {
        moveBeam(grid, y + 1, x, Direction.South);
      }
      break;
    }
    case "\\": {
      if (direction === Direction.North) {
        moveBeam(grid, y, x - 1, Direction.West);
      } else if (direction === Direction.East) {
        moveBeam(grid, y + 1, x, Direction.South);
      } else if (direction === Direction.South) {
        moveBeam(grid, y, x + 1, Direction.East);
      } else if (direction === Direction.West) {
        moveBeam(grid, y - 1, x, Direction.North);
      }
      break;
    }

    default: {
      throw new Error(`Unknown cell type: '${cell}'`);
    }
  }

  // const [dy, dx] = getDirectionCoords(direction);
  // const nextY = y + dy;
  // const nextX = x + dx;

  // const nextCell = grid[nextY]?.[nextX];
  // if (nextCell === undefined) return;

  // if (nextCell === ".") {
  //   moveBeam(grid, nextY, nextX, direction);
  //   return;
  // }

  // if (nextCell === "/") {
  //   visited[nextY][nextX] = true;
  //   switch (direction) {
  //     case Direction.North: {
  //       moveBeam(grid, nextY, nextX + 1, Direction.East);
  //       break;
  //     }
  //     case Direction.East: {
  //       moveBeam(grid, nextY + 1, nextX, Direction.South);
  //       break;
  //     }
  //     case Direction.South: {
  //       moveBeam(grid, nextY, nextX - 1, Direction.West);

  //       break;
  //     }
  //     case Direction.West: {
  //       moveBeam(grid, nextY - 1, nextX, Direction.North);
  //       break;
  //     }
  //   }
  //   return;
  // }

  // if (nextCell === "\\") {
  //   visited[nextY][nextX] = true;
  //   switch (direction) {
  //     case Direction.North: {
  //       moveBeam(grid, nextY, nextX - 1, Direction.West);
  //       break;
  //     }
  //     case Direction.East: {
  //       moveBeam(grid, nextY - 1, nextX, Direction.North);
  //       break;
  //     }
  //     case Direction.South: {
  //       moveBeam(grid, nextY, nextX + 1, Direction.East);
  //       break;
  //     }
  //     case Direction.West: {
  //       moveBeam(grid, nextY + 1, nextX, Direction.South);
  //       break;
  //     }
  //   }

  //   return;
  // }

  // if (nextCell === "|") {
  //   visited[nextY][nextX] = true;
  //   if (direction === Direction.East || direction === Direction.West) {
  //     moveBeam(grid, nextY - 1, nextX, Direction.North);
  //     moveBeam(grid, nextY + 1, nextX, Direction.South);
  //   } else if (direction === Direction.North) {
  //     moveBeam(grid, nextY - 1, nextX, Direction.North);
  //   } else if (direction === Direction.South) {
  //     moveBeam(grid, nextY + 1, nextX, Direction.South);
  //   }

  //   return;
  // }

  // if (nextCell === "-") {
  //   visited[nextY][nextX] = true;
  //   if (direction === Direction.North || direction === Direction.South) {
  //     moveBeam(grid, nextY, nextX - 1, Direction.West);
  //     moveBeam(grid, nextY, nextX + 1, Direction.East);
  //   } else if (direction === Direction.East) {
  //     moveBeam(grid, nextY, nextX + 1, Direction.East);
  //   } else if (direction === Direction.West) {
  //     moveBeam(grid, nextY, nextX - 1, Direction.West);
  //   }
  //   return;
  // }
}

moveBeam(grid, 0, 0, Direction.East);

// for (let y = 0; y < visited.length; y++) {
//   let line = "";
//   for (let x = 0; x < visited[y].length; x++) {
//     line += visited[y][x] ? "#" : ".";
//   }
//   console.log(line);
// }

console.info(energizedTileCoords.size);
// console.info(visited.flat().filter((x) => x).length);
