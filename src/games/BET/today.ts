import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { todayDate } from "../../mixin/todayDate"
const app = new Hono();

const venasbet = async () => {
  const { data } = await axios.get("https://www.supatips.com/");
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];
  const { day, month } = todayDate();

  $(".main .tab-content #tab2222 table tbody tr")
    .slice(2)
    .each((i, el) => {
      if (i !== 2 && i !== 5 && i !== 8) {
        const tds = $(el).find("td");
        const date = `${month} ${day}`;
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
        teams.push({
          date,
          home,
          away,
          league,
          tips,
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
  "/today/games/bet_of_the_day",
  getGames,
  cache({
    cacheName: "todayBET",
    cacheControl: "max-age=14400",
  })
);

export default app.route("/", app);
