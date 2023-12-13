export function toTransposed<T>(grid: T[][]) {
  return grid.reduce(
    (result, row) =>
      row.map((
        cellValue,
        colIndex,
      ) => [...(result[colIndex] || []), cellValue]),
    [] as T[][],
  );
}

export function toTransposedStringArray(rows: string[]) {
  const grid = rows.map((r) => r.split(""));
  const transposedGrid = toTransposed(grid);
  return transposedGrid.map((r) => r.join(""));
}
