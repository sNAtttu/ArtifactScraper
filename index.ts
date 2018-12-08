import * as bodyParser from "body-parser";
import * as express from "express";
import { IDeck } from "./src/Interfaces/Deck";
import Scraper from "./src/Scraper";
const app = express();
const port = 3000;

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.get("/", (request, response) => {
  response.send("Up and running");
});

app.post("/deck/", (request, response) => {
  const useFileSystem = false;
  const useDatabase = true;
  const scraper = new Scraper(useFileSystem, useDatabase);
  const { winAmount, author, deckCode } = request.body;
  const loadDeck: Promise<IDeck | void> = scraper.createDeckFromDeckCode(
    winAmount,
    author,
    deckCode
  );
  loadDeck
    .then(deck => {
      if (deck) {
        response.send(deck);
      } else {
        response.send("Unable to scrape the deck");
      }
    })
    .catch(error => response.send(error));
});

app.listen(port, () =>
  console.log("Artifact Scraper listening on port " + port)
);
