export function replaceAt(
  input: string,
  searchValue: string,
  replaceValue: string,
  position: number,
) {
  return input.substring(0, position) + replaceValue +
    input.substring(position + searchValue.length);
}

export function getFirstOccurance(input: string, candidates: string[]): string {
  let lowestIndex = Number.MAX_SAFE_INTEGER;
  let lowestCandidate = "";

  candidates.forEach((c) => {
    const index = input.indexOf(c);
    if (index !== -1 && index < lowestIndex) {
      lowestIndex = index;
      lowestCandidate = c;
    }
  });

  return lowestCandidate;
}

export function getLastOccurance(input: string, candidates: string[]): string {
  let highestIndex = -1;
  let highestCandidate = "";

  candidates.forEach((c) => {
    const index = input.lastIndexOf(c);
    if (index !== -1 && index > highestIndex) {
      highestIndex = index;
      highestCandidate = c;
    }
  });

  return highestCandidate;
}
