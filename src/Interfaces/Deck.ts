export interface ICard {
  cardName: string;
  cardAmountInDeck: number;
}
export interface IDeck {
  deckCode: string;
  cards: ICard[];
  wins: number;
  totalCardAmountInDeck: number;
}
