export enum HandType {
  HighCard = 0,
  OnePair = 1,
  TwoPair = 2,
  ThreeOfAKind = 3,
  FullHouse = 4,
  FourOfAKind = 5,
  FiveOfAKind = 6,
}

export type Hand = {
  bid: number;
  strengths: number[];
  type: HandType;
};

export function buildHandList(inputLines: string[], hasJoker: boolean): Hand[] {
  const labelToStrengthMap = buildLabelToStrengthMap(hasJoker);

  return inputLines.map<Hand>((line) => {
    const [hand, bid] = line.split(" ");
    let cards = hand.split("");
    const strengths = cards.map((x) => labelToStrengthMap[x]);

    if (hasJoker) {
      const occurrences = buildOccurrenceList(cards).filter((x) =>
        x.key !== "J"
      );
      const highestOccurance = occurrences[0];
      cards = cards.map((x) => x.replaceAll("J", highestOccurance?.key));
    }

    const type = getHandType(cards);

    return { bid: +bid, strengths, type };
  });
}

export function getHandType(cards: string[]): HandType {
  const occurrences = buildOccurrenceList(cards);
  const counts = occurrences.map((x) => x.value);

  if (counts.includes(5)) {
    return HandType.FiveOfAKind;
  }

  if (counts.includes(4)) {
    return HandType.FourOfAKind;
  }

  if (counts.includes(3)) {
    if (counts.includes(2)) {
      return HandType.FullHouse;
    } else {
      return HandType.ThreeOfAKind;
    }
  }

  if (counts.includes(2)) {
    const pairCount = counts.filter((x) => x === 2).length;
    if (pairCount === 2) {
      return HandType.TwoPair;
    } else {
      return HandType.OnePair;
    }
  }

  return HandType.HighCard;
}

export function buildLabelToStrengthMap(
  hasJoker: boolean,
): Record<string, number> {
  return {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "T": 10,
    "J": hasJoker ? 1 : 11,
    "Q": 12,
    "K": 13,
    "A": 14,
  };
}

export function buildOccurrenceList(input: string[]) {
  const occurrencesMap = input.reduce((acc, current) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.keys(occurrencesMap).map((item: string) => {
    return { key: item, value: occurrencesMap[item] };
  }).sort((a, b) => b.value - a.value);
}

export function sortHands(hands: Hand[]): Hand[] {
  return hands.toSorted((a, b) => {
    if (a.type === b.type) {
      for (let i = 0; i < a.strengths.length; i++) {
        const A = a.strengths[i];
        const B = b.strengths[i];
        if (A > B) return 1;
        if (B > A) return -1;
      }
      return 0;
    }

    return a.type > b.type ? 1 : -1;
  });
}

export function countTotalWinnings(sortedHands: Hand[]): number {
  let totalWinnings = 0;

  sortedHands.forEach((hand, index) => {
    const rank = index + 1;
    const winnings = rank * hand.bid;
    totalWinnings += winnings;
  });

  return totalWinnings;
}
