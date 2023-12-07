const lines = await Deno.readTextFile("./input.txt");
const input = lines.split("\n").filter((l) => l);

function buildOccurrenceMap<T extends string | number>(arr: T[]) {
  return arr.reduce((acc, current) => {
    acc[current] = (acc[current] || 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

enum HandType {
  FiveOfAKind = 7,
  FourOfAKind = 6,
  FullHouse = 5,
  ThreeOfAKind = 4,
  TwoPair = 3,
  OnePair = 2,
  HighCard = 1,
}

const labelToStrength: Record<string, number> = {
  "J": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "T": 10,
  "Q": 11,
  "K": 12,
  "A": 13,
};

export class Hand {
  hand: string;
  bid: number;
  type!: HandType;
  strengths: number[];
  cards: string[];

  constructor(line: string) {
    const [hand, bid] = line.split(" ");
    this.hand = line.split(" ")[0];
    // this.cards = hand.split(""); // .map((x) => labelToStrength[x]);
    this.strengths = hand.split("").map((x) => labelToStrength[x]);
    this.bid = Number(bid);

    const occurrences = buildOccurrenceMap(hand.split(""));

    const result = Object.keys(occurrences).filter((x) => x !== "J").map(
      (item: any) => {
        return { key: item, value: occurrences[item] };
      },
    );
    result.sort((a, b) => b.value - a.value);

    const highestOccurance = result.at(0);

    this.cards = hand.split("").map((x) =>
      x.replaceAll("J", highestOccurance?.key ?? "J")
    );

    const newOccurences = buildOccurrenceMap(this.cards);
    const kinds = Object.keys(newOccurences).length;
    const values = Object.values(newOccurences).sort();

    if (kinds === 1) {
      this.type = HandType.FiveOfAKind;
    } else if (kinds === 2) {
      if (values[0] === 1) {
        this.type = HandType.FourOfAKind;
      } else {
        this.type = HandType.FullHouse;
      }
    } else if (kinds === 3) {
      if (values[0] === 1 && values[1] === 1 && values[2] === 3) {
        this.type = HandType.ThreeOfAKind;
      } else if (values[0] === 1 && values[1] === 2 && values[2] === 2) {
        this.type = HandType.TwoPair;
      }
    } else if (kinds === 4) {
      this.type = HandType.OnePair;
    } else {
      this.type = HandType.HighCard;
    }
  }
}

const hands = input.map((x) => new Hand(x));

hands.sort((a, b) => {
  if (a.type === b.type) {
    for (let i = 0; i < a.cards.length; i++) {
      const A = a.strengths[i];
      const B = b.strengths[i];
      if (A > B) return 1;
      if (B > A) return -1;
    }
    return 0;
  }
  return a.type > b.type ? 1 : -1;
});

console.info(hands);

let totalWinnings = 0;
hands.forEach((hand, index) => {
  const rank = index + 1;
  const winnings = rank * hand.bid;
  totalWinnings += winnings;
});

console.log(totalWinnings);
