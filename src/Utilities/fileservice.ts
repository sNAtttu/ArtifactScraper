import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import { IDeck } from "../Interfaces/Deck";

export default class FileService {
  public static WriteDeckToJsonFile(deck: IDeck, fileFolderPath: string) {
    const deckAsJson = JSON.stringify(deck);
    console.log("Deck to be writed as json file");
    console.log(deckAsJson);
    const filePath = join(`${fileFolderPath}`, `${deck.deckCode}.json`);
    if (existsSync(fileFolderPath)) {
      writeFileSync(filePath, deckAsJson);
    } else {
      mkdirSync(fileFolderPath);
      writeFileSync(filePath, deckAsJson);
    }
    console.log(`Deck saved to following path ${filePath}`);
  }
}
