export function countArrangements(
  springs: string,
  groupSizes: number[],
  cache: Record<string, number> = {},
): number {
  const key = `${springs}_${groupSizes}`;
  if (Object.hasOwn(cache, key)) return cache[key];

  if (springs === "") {
    return groupSizes.length > 0 ? 0 : 1;
  }
  if (groupSizes.length === 0) {
    return springs.includes("#") ? 0 : 1;
  }

  let arrangements = 0;

  if (springs[0] !== "#") {
    arrangements += countArrangements(springs.slice(1), groupSizes, cache);
  }
  if (springs[0] !== ".") {
    if (isCurrentGroupValid(springs, groupSizes[0])) {
      arrangements += countArrangements(
        springs.slice(groupSizes[0] + 1),
        groupSizes.slice(1),
        cache,
      );
    }
  }

  cache[key] = arrangements;
  return arrangements;
}

function isCurrentGroupValid(springs: string, groupSize: number): boolean {
  if (groupSize > springs.length) return false;

  if (springs.slice(0, groupSize).includes(".")) return false;

  if (springs[groupSize] === "#") return false;

  return true;
}
