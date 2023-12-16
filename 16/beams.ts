export enum Direction {
  North = "North",
  East = "East",
  South = "South",
  West = "West",
}

const SLASHMAP: Record<Direction, Direction> = {
  "North": Direction.East,
  "East": Direction.North,
  "South": Direction.West,
  "West": Direction.South,
};
const BACKSLASHMAP: Record<Direction, Direction> = {
  "North": Direction.West,
  "East": Direction.South,
  "South": Direction.East,
  "West": Direction.North,
};

function getDelta(direction: Direction) {
  switch (direction) {
    case Direction.North:
      return [-1, 0];
    case Direction.East:
      return [0, 1];
    case Direction.South:
      return [1, 0];
    case Direction.West:
      return [0, -1];
  }
}

export function findEnergizedTiles(
  grid: string[][],
  y: number,
  x: number,
  direction: Direction,
) {
  const energizedTileCoords = new Set<string>();
  const uniqueEncounters = new Set<string>();

  function moveBeam(y: number, x: number, dir: Direction) {
    if (grid[y] === undefined || grid[y][x] === undefined) return;

    const key = `${y}_${x}_${dir}`;
    if (uniqueEncounters.has(key)) return;
    uniqueEncounters.add(key);
    energizedTileCoords.add(`${y}_${x}`);

    const cell = grid[y][x];
    let reflectedDir = dir;

    if (cell === "|") {
      if (dir === "East" || dir === "West") {
        moveBeam(y - 1, x, Direction.North);
        moveBeam(y + 1, x, Direction.South);
        return;
      }
    } else if (cell === "-") {
      if (dir === "North" || dir === "South") {
        moveBeam(y, x - 1, Direction.West);
        moveBeam(y, x + 1, Direction.East);
        return;
      }
    } else if (cell === "/") {
      reflectedDir = SLASHMAP[dir];
    } else if (cell == "\\") {
      reflectedDir = BACKSLASHMAP[dir];
    }

    const [dy, dx] = getDelta(reflectedDir);
    moveBeam(y + dy, x + dx, reflectedDir);
  }

  moveBeam(y, x, direction);

  return energizedTileCoords.size;
}
