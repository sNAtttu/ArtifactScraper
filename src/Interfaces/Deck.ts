export type CardType = "Spell" | "Item" | "Improvement" | "Creep";
export type Color = "Green" | "Red" | "Blue" | "Black";
export interface ICard {
  cardName: string;
  cardAmountInDeck: number;
  cost: number;
  type: CardType;
  color: Color;
  isSignatureCard: boolean;
}
export interface IDeck {
  author: string;
  deckCode: string;
  cards: ICard[];
  wins: number;
  totalCardAmountInDeck: number;
}
