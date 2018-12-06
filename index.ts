import { join } from "path";
import { argv } from "yargs";
import { IDeck } from "./src/Interfaces/Deck";
import DataService from "./src/Utilities/dataservice";
import FileService from "./src/Utilities/fileservice";
import Parser from "./src/Utilities/parser";
class Scraper {
  public static main(deckCode: string): void {
    const dataService = new DataService();
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

if (!argv.code) {
  console.log("You need to provide the deck code");
  console.log("Example node index.js --code=ASDBASDBASDASDJ2133121321");
}

Scraper.main(argv.code);
