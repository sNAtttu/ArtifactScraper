## Artifact Deck Saver
## Overview

A small NodeJS application written in TypeScript which is at this point of time getting the card names of the linked draft deck.

## Instructions

1. Pull the repository
2. `yarn install`
3. `yarn compile`
4. `yarn start`

After these four steps you should have an express server running on localhost:3000.

Example of payload that the server approves:

URL: http://localhost:3000

Payload:
{
"winAmount": 1,
"author": "sNAttu",
"deckCode": "ADCJYIAKH02uwFOqQEBeF0CJt0BBAcLAkcISAQCBR8FBgMJDQsHAVw3AQQPEA0kAR4_"
}

Response will be a json object which is generated from the contents in url 

https://www.playartifact.com/d/ADCJYIAKH02uwFOqQEBeF0CJt0BBAcLAkcISAQCBR8FBgMJDQsHAVw3AQQPEA0kAR4_

## Motivation

Project exists because I want to know my deck history and see what cards I've played in the past.
