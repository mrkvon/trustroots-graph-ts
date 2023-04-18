# Trustroots graph

This Node.js & TypeScript app finds users of [trustroots.org](https://www.trustroots.org) and their connection to other users.

It fetches all hosts on the map, and then crawls through the Trustroots network searching users and their connections.

Users without connection to the main network will not be found.

## This app doesn't currently work because of Cloudflare protection

Currently, Trustroots is protected with CloudFlare, and this crawler doesn't work anymore.

A workaround is possible: copy CloudFlare cookie from your browser, and use it in this app. We managed to work it, but the code is not available, yet.

## Prerequisities

Node and yarn installed

## Installation

1. clone this repository `git clone https://github.com/mrkvon/trustroots-graph-ts.git`
2. go to project folder `cd trustroots-graph-ts`
3. install node modules `yarn`
4. create `.env` file `cp .env.sample .env`, open `.env` and insert your Trustroots credentials there

## Usage

- run `yarn start`
- watch the data scraper work. When it finishes, you'll find list of users and connections in `output` folder
- play with the data (i.e. with [gephi](https://gephi.org/))

## License

MIT
