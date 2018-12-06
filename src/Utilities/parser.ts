import * as cheerio from "cheerio";

export default class Parser {
  public static parseCardsFromHtml(html: string): string[] {
    const cardsInDeck: string[] = cheerio(".cardName", html)
      .map(function cardNameMapper(
        index: number,
        cardNameElement: CheerioElement
      ): string {
        return cheerio(this).text();
      })
      .get();

    return cardsInDeck;
  }
}
