import { join } from "path";
import { argv } from "yargs";
import { ICard, IDeck } from "./Interfaces/Deck";

import CardUtilities from "./Utilities/CardUtilities";
import DataService from "./Utilities/DataService";
import FileService from "./Utilities/FileService";
import Parser from "./Utilities/Parser";
export default class Scraper {
  public static main(deckCode: string): void {
    const dataService = new DataService();
    const url: string = `https://www.playartifact.com/d/${deckCode}`;
    dataService
      .getRawHtmlFromSite(url)
      .then(html => {
        const cards: ICard[] = Parser.parseCardsFromHtml(html);
        const totalCardAmountInDeck = CardUtilities.GetCardAmountInDeck(cards);
        const author = argv.author || "unknown";
        const wins = argv.wins || 0;
        const scrapedDeck: IDeck = {
          author,
          cards,
          deckCode,
          totalCardAmountInDeck,
          wins
        };
        const folderPath = join(`${__dirname}`, `${Scraper.FolderName}`);
        FileService.WriteDeckToJsonFile(scrapedDeck, folderPath);
      })
      .catch(error => {
        console.log(error);
      });
  }
  private static readonly FolderName: string = "Drafts";
}
