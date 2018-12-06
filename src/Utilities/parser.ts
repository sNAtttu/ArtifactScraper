import * as cheerio from "cheerio";
import { CardType, Color, ICard } from "../Interfaces/Deck";

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
        const costElementText: string = cheerio(cardElement)
          .children(".cardTypeAndCost")
          .children(".cardCost")
          .text();
        const color = Parser.getCardColor(cardElement);
        const type = Parser.getCardType(cardElement);
        const cost = parseInt(costElementText);
        return {
          cardAmountInDeck,
          cardName,
          color,
          cost,
          type
        };
      })
      .get();

    return cardsInDeck;
  }
  private static getCardColor(cardElement: CheerioElement): Color {
    const cheerioElement = cheerio(cardElement);
    if (cheerioElement.hasClass("colorGreen")) {
      return "Green";
    } else if (cheerioElement.hasClass("colorBlack")) {
      return "Black";
    } else if (cheerioElement.hasClass("colorRed")) {
      return "Red";
    } else if (cheerioElement.hasClass("colorBlue")) {
      return "Blue";
    } else {
      console.log("The card does not have any color classes attached to it");
      return undefined;
    }
  }
  private static getCardType(cardElement: CheerioElement): CardType {
    const cheerioElement = cheerio(cardElement);
    if (cheerioElement.hasClass("typeCreep")) {
      return "Creep";
    } else if (cheerioElement.hasClass("typeImprovement")) {
      return "Improvement";
    } else if (cheerioElement.hasClass("typeSpell")) {
      return "Spell";
    } else if (cheerioElement.hasClass("typeItem")) {
      return "Item";
    } else {
      console.log("The card does not have any color classes attached to it");
      return undefined;
    }
  }
}
