import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

// Variables
const app = new Hono();

const venasbet = async () => {
  const {month, yesterday} = yesterdayDate();
  const { data } = await axios.get(
    `https://www.supatips.com/`
  );
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];

  $(".main .tab-content #tab1111 table tbody tr")
    .slice(2)
    .each((i, el) => {
      if (i !== 2 && i !== 5 && i !== 8) {
        const tds = $(el).find("td");
        console.log(tds);
        const date = `${month} ${yesterday}`;
        const league = $(tds[1])
          .text()
          ?.replace(/[^\w\s]/gi, "")
          ?.replace(/[\n\t]/g, "")
          ?.trim();
        const home = $(tds[2])
          .text()
          ?.replace(/[^\w\s-]/gi, "")
          ?.replace(/[\n\t]/g, "")
          ?.split("vs")[0]
          ?.trim();
        const away = $(tds[2])
          .text()
          ?.replace(/[^\w\s-]/gi, "")
          ?.replace(/[\n\t]/g, "")
          ?.split("vs")[1]
          ?.trim();
        const tips = $(tds[3]).text()?.trim();
        const score = $(tds[4]).text()?.replace(/[^0-9-]+/g, '')?.trim();
        teams.push({
          date,
          home,
          away,
          league,
          tips,
          score
        });
      }
    });
  return teams;
};

const setCahe = async () => {
  const concat = await venasbet();
  return concat;
};

const getGames = async (res: any) => {
  return res.json({ predictions: await setCahe() });
};

app.get(
  "/yesterday/games/bet_of_the_day",
  getGames,
  cache({
    cacheName: "yesterdayBETofTheDay",
    cacheControl: "max-age=14400",
  })
);

export default app.route("/", app);
