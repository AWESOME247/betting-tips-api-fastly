import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

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

const d = new Date();
const month = months[d.getMonth()];
const day = d.getDate();

const yesterday = new Date(d);
yesterday.setDate(d.getDate() - 1);
const yes = yesterday.getDate();

const venasbetY = async () => {
  const { data } = await axios.get("https://meritpredict.com/");
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];

  $(".bdt-switcher-wrapper .bdt-tab-content-item:nth-child(2) table tbody tr").each(
    (i, el) => {
      const tds = $(el).find("td");
      const date = `${day === 1 ? months[d.getMonth() - 1] : month} ${yes}`;
      const league = $(tds[1])
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const home = $(tds[2])
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const away = $(tds[4])
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const tips = $(tds[5]).text()?.trim();
      teams.push({
        date,
        home,
        away,
        league,
        tips,
      });
    }
  );
  return teams;
};
const venasbet = async () => {
  const { data } = await axios.get("https://meritpredict.com/");
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];

  $(".bdt-switcher-wrapper .bdt-tab-content-item:nth-child(1) table tbody tr").each(
    (i, el) => {
      const tds = $(el).find("td");
      const date = `${month} ${day}`;
      const league = $(tds[1])
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const home = $(tds[2])
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const away = $(tds[4])
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const tips = $(tds[5]).text()?.trim();
      teams.push({
        date,
        home,
        away,
        league,
        tips,
      });
    }
  );
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

app.get("/today/games/2odds", getGames, cache({
  cacheName: 'today2odds',
  cacheControl: 'max-age=14400',
}));
app.get("/yesterday/games/2odds", getGamesY, cache({
  cacheName: 'yesterday2odds',
  cacheControl: 'max-age=14400',
}));

export default app.route("/", app);
