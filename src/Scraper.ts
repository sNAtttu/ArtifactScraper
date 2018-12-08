import { join } from "path";
import { argv } from "yargs";
import { ICard, IDeck } from "./Interfaces/Deck";

import CardUtilities from "./Utilities/CardUtilities";
import DataService from "./Utilities/DataService";
import FileService from "./Utilities/FileService";
import Parser from "./Utilities/Parser";
export default class Scraper {
  public useFileSystem: boolean = false;
  public useDatabase: boolean = true;
  private folderName: string = "Drafts";
  private readonly artifactHostUrl: string = "https://www.playartifact.com/d/";
  constructor(
    useFileSystem: boolean,
    useDatabase: boolean,
    folderName?: string
  ) {
    this.useFileSystem = useFileSystem;
    this.useDatabase = useDatabase;
    this.folderName = folderName;
  }
  public async createDeckFromDeckCode(
    wins: number,
    author: string,
    deckCode: string
  ): Promise<IDeck | void> {
    const dataService = new DataService();
    const url: string = `${this.artifactHostUrl}${deckCode}`;
    const deckPromise: IDeck | void = await dataService
      .getRawHtmlFromSite(url)
      .then(html => {
        const cards: ICard[] = Parser.parseCardsFromHtml(html);
        const totalCardAmountInDeck = CardUtilities.GetCardAmountInDeck(cards);
        const created: Date = new Date();
        const scrapedDeck: IDeck = {
          author,
          cards,
          created,
          deckCode,
          totalCardAmountInDeck,
          wins
        };
        const folderPath = join(`${__dirname}`, `${this.folderName}`);
        if (this.useFileSystem) {
          FileService.WriteDeckToJsonFile(scrapedDeck, folderPath);
        }
        if (this.useDatabase) {
          dataService.saveDeckToDatabase(scrapedDeck);
        }

        return scrapedDeck;
      })
      .catch(error => {
        console.log(error);
      });
    return deckPromise;
  }
}
