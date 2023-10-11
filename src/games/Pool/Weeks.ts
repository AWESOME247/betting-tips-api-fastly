import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

const app = new Hono();

const venasbet = async () => {
  const { data } = await axios.get(`https://ablefast.com`);
  const html = data;
  const $ = cheerio.load(html);
  const dates: any = []
  $('select option:not(:first-child)').each((i, el) => {
    dates.push($(el).text())
  });
  return dates;
};

const setCahe = async () => {
  const concat = await venasbet();
  return concat;
};

const getGames = async (res: any) => {
  return res.json({ predictions: await setCahe() });
};

app.get("/pool/weekly/features", getGames, cache({
  cacheName: 'poolWeeklyFixtures',
  cacheControl: 'max-age=14400',
}));

export default app.route("/", app);