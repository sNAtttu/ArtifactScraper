import { MongoClient } from "mongodb";
import * as requestPromise from "request-promise";
import { IDeck } from "../Interfaces/Deck";

export default class DataService {
  private databaseUrl: string = "mongodb://localhost:27017";
  private databaseName: string = "ArtifactDeckDb";
  private deckCollectionName: string = "decks";

  public async getRawHtmlFromSite(url: string): Promise<string> {
    return requestPromise(url);
  }
  public async getDraftedDecksFromDatabase(
    sendResponse: (cards: IDeck[]) => void
  ) {
    const client = new MongoClient(this.databaseUrl);
    client.connect(async err => {
      console.log("Connected successfully to database server");
      if (err) {
        console.log(err);
        throw err;
      }
      const db = client.db(this.databaseName);
      const deckCollection = db.collection(this.deckCollectionName);
      const allCards = await deckCollection.find({}).toArray();
      console.log("Got all cards from DB. Count " + allCards.length);
      client.close();
      sendResponse(allCards);
    });
  }
  public async saveDeckToDatabase(deck: IDeck) {
    const client = new MongoClient(this.databaseUrl);

    // Use connect method to connect to the Server
    client.connect(err => {
      console.log("Connected successfully to database server");
      if (err) {
        console.log(err);
        throw err;
      }
      const db = client.db(this.databaseName);
      const deckCollection = db.collection(this.deckCollectionName);
      deckCollection.insertOne(deck, (error, result) => {
        if (error) {
          console.log("Error in inserting deck to database");
          throw error;
        }
        console.log("Insert result");
        console.log(JSON.stringify(result));
      });
      client.close();
    });
  }
}
