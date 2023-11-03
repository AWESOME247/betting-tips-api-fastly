import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

const app = new Hono();

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const venasbetY = async () => {
  const { data } = await axios.get("https://confirmbets.com/amp/home/");
  const { month, yesterday, day, lastMonth } = yesterdayDate();
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];

  $("#tabpanel1 table tbody tr").each((i, el) => {
    const tds = $(el).find("td");
    const date = `${day === 1 ? months[lastMonth - 1] : month} ${yesterday}`;
    const league = $(tds[0])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const home = $(tds[1])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.split(" Vs ")[0]
      ?.trim();
    const away = $(tds[1])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.split(" Vs ")[1]
      ?.split("  ")[0]
      ?.trim();
    const tips = $(tds[2]).text()?.trim();
    teams.push({
      date,
      home,
      away,
      league,
      tips,
    });
  });
  return teams;
};
const venasbet = async () => {
  const {month, yesterday } = yesterdayDate();
  const { data } = await axios.get("https://confirmbets.com/amp/home/");
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];

  $("#tabpanel2 table tbody tr").each((i, el) => {
    const tds = $(el).find("td");
    const date = `${month} ${yesterday + 1}`;
    const league = $(tds[0])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const home = $(tds[1])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.split(" Vs ")[0]
      ?.trim();
    const away = $(tds[1])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.split(" Vs ")[1]
      ?.split("  ")[0]
      ?.trim();
    const tips = $(tds[2]).text()?.trim();
    teams.push({
      date,
      home,
      away,
      league,
      tips,
    });
  });
  return teams;
};

const setCahe = async () => {
  const concat = await venasbet();
  return concat;
};
const setCaheY = async () => {
  const concat = await venasbetY();
  return concat;
};

const getGames = async (res: any) => {
  return res.json({ predictions: await setCahe() });
};
const getGamesY = async (res: any) => {
  return res.json({ predictions: await setCaheY() });
};

app.get(
  "/today/games/2odds",
  getGames,
  cache({
    cacheName: "today2odds",
    cacheControl: "max-age=14400",
  })
);
app.get(
  "/yesterday/games/2odds",
  getGamesY,
  cache({
    cacheName: "yesterday2odds",
    cacheControl: "max-age=14400",
  })
);

export default app.route("/", app);
