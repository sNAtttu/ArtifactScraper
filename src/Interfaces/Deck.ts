export type CardType = "Spell" | "Item" | "Improvement" | "Creep";
export type Color = "Green" | "Red" | "Blue" | "Black";
export type DraftType = "Casual" | "Phantom" | "Keeper";
export interface ICard {
  cardName: string;
  cardAmountInDeck: number;
  cost: number;
  type: CardType;
  color: Color;
  isSignatureCard: boolean;
}

export interface IHero {
  name: string;
  color: Color;
  signatureCard: string;
}

export interface IDeck {
  author: string;
  created: Date;
  deckCode: string;
  draftType: DraftType;
  cards: ICard[];
  loses: number;
  wins: number;
  isPerfectRun: boolean;
  totalCardAmountInDeck: number;
  heroes: IHero[];
}
