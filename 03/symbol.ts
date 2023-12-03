type Symbol = {
  char: string;
  y: number;
  x: number;
};

export type Part = {
  value: string;
  used?: boolean;
};

export function loadSymbolsAndParts(lines: string[]) {
  const symbols: Symbol[] = [];
  const parts: Part[][] = [];

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    const partLine: Part[] = new Array(line.length);
    parts.push(partLine);

    for (let x = 0; x < line.length; x++) {
      const char = line[x];

      if (char.match(/\d/)) {
        if (x === 0 || !partLine[x - 1]) {
          partLine[x] = { value: char };
        } else {
          partLine[x - 1].value += char;
          partLine[x] = partLine[x - 1];
        }
      } else if (char !== ".") {
        symbols.push({ char, y, x });
      }
    }
  }

  return { symbols, parts };
}
