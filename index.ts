import * as express from "express";
import Scraper from "./src/Scraper";

const app = express();
const port = 3000;

app.post("/code/:code", (request, response) => {
  Scraper.main(request.params.code);
  response.send(request.params.code);
});

app.listen(port, () =>
  console.log("Artifact Scraper listening on port " + port)
);

// Scraper.main(deckCodeFromArguments);
