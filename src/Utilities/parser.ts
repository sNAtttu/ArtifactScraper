import * as cheerio from "cheerio";
import { ICard } from "../Interfaces/Deck";

export default class Parser {
  public static parseCardsFromHtml(html: string): ICard[] {
    const cardsInDeck: ICard[] = cheerio(".card", html)
      .map(function cardNameMapper(
        index: number,
        cardElement: CheerioElement
      ): ICard {
        const cardName: string = cheerio(cardElement)
          .children(".cardNameContainer")
          .children(".cardName")
          .text();
        const cardCountText: string = cheerio(cardElement)
          .children(".cardCount")
          .text();
        const cardAmountInDeck: number = parseInt(
          cardCountText.replace("x", "")
        );
        return {
          cardAmountInDeck,
          cardName
        };
      })
      .get();

    return cardsInDeck;
  }
}
