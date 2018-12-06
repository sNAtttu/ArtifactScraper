export interface ICard {
  cardName: string;
  cardAmountInDeck: number;
}
export interface IDeck {
  author: string;
  deckCode: string;
  cards: ICard[];
  wins: number;
  totalCardAmountInDeck: number;
}
