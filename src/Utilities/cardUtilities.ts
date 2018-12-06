import { ICard } from "../Interfaces/Deck";
export default class CardUtilities {
  public static GetCardAmountInDeck(cards: ICard[]): number {
    let cardAmount = 0;
    cards.forEach(card => (cardAmount += card.cardAmountInDeck));
    return cardAmount;
  }
}
