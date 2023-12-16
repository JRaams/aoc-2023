export enum Direction {
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

export function findEnergizedTiles(
  grid: string[][],
  y: number,
  x: number,
  direction: Direction,
): number {
  const energizedTileCoords = new Set<string>();
  const uniqueEncounters = new Set<string>();

  function moveBeam(y: number, x: number, direction: Direction) {
    if (grid[y] === undefined || grid[y][x] === undefined) return;

    const key = `${y}_${x}_${direction}`;
    if (uniqueEncounters.has(key)) return;
    uniqueEncounters.add(key);
    energizedTileCoords.add(`${y}_${x}`);

    const [dy, dx] = getDirectionCoords(direction);
    const nextY = y + dy;
    const nextX = x + dx;

    const cell = grid[y][x];
    switch (cell) {
      case ".": {
        moveBeam(nextY, nextX, direction);
        break;
      }
      case "|": {
        if (direction === Direction.East || direction === Direction.West) {
          moveBeam(y - 1, x, Direction.North);
          moveBeam(y + 1, x, Direction.South);
        } else {
          moveBeam(nextY, nextX, direction);
        }
        break;
      }
      case "-": {
        if (direction === Direction.North || direction === Direction.South) {
          moveBeam(y, x - 1, Direction.West);
          moveBeam(y, x + 1, Direction.East);
        } else {
          moveBeam(nextY, nextX, direction);
        }
        break;
      }
      case "/": {
        if (direction === Direction.North) {
          moveBeam(y, x + 1, Direction.East);
        } else if (direction === Direction.East) {
          moveBeam(y - 1, x, Direction.North);
        } else if (direction === Direction.South) {
          moveBeam(y, x - 1, Direction.West);
        } else if (direction === Direction.West) {
          moveBeam(y + 1, x, Direction.South);
        }
        break;
      }
      case "\\": {
        if (direction === Direction.North) {
          moveBeam(y, x - 1, Direction.West);
        } else if (direction === Direction.East) {
          moveBeam(y + 1, x, Direction.South);
        } else if (direction === Direction.South) {
          moveBeam(y, x + 1, Direction.East);
        } else if (direction === Direction.West) {
          moveBeam(y - 1, x, Direction.North);
        }
        break;
      }

      default: {
        throw new Error(`Unknown cell type: '${cell}'`);
      }
    }
  }

  moveBeam(y, x, direction);

  return energizedTileCoords.size;
}
