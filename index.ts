import { join } from "path";
import { IDeck } from "./src/Interfaces/Deck";
import DataService from "./src/Utilities/dataservice";
import FileService from "./src/Utilities/fileservice";
import Parser from "./src/Utilities/parser";
class Scraper {
  public static main(): void {
    const dataService = new DataService();
    const deckCode: string =
      "ADCJZcAI30mvAGAKAFAuF0m3QEoAUkLW0kKFQgDGQELKgEMLQEBAUEGaQEIgQE_";
    const url: string = `https://www.playartifact.com/d/${deckCode}`;
    dataService
      .getRawHtmlFromSite(url)
      .then(html => {
        const cards: string[] = Parser.parseCardsFromHtml(html);
        const scrapedDeck: IDeck = {
          cards,
          deckCode
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

Scraper.main();
