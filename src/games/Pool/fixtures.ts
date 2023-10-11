import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

const app = new Hono();

const venasbet = async (week: string) => {
  const { data } = await axios.get(
    `https://ablefast.com/${week ? "result/" + week : ""}`
  );
  const html = data;
  const $ = cheerio.load(html);
  const team: any = [];
  let weekDay;
  if (!week) {
    weekDay = $(".container .blue-text:nth-child(3)").text();
  }
  if (week) {
    weekDay = $(".container h1").text()?.split(" ")[1]?.replace(",", "");
  }
  $("#table tbody tr:not(:first-child)").each((i, el) => {
    const tds = $(el).find("td");
    const num = $(tds[0])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const home = $(tds[1])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const score = $(tds[2])
      .text()
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const away = $(tds[3])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const result = $(tds[4])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    const status = $(tds[5])
      .text()
      ?.replace(/[^\w\s]/gi, "")
      ?.replace(/[\n\t]/g, "")
      ?.trim();
    team.push({ num, home, away, score, result, status });
  });
  const color = $('thead');
  const bg = color.attr("class");
  return { team, weekDay, bgColor: bg };
};

const setCahe = async (week: string) => {
  const concat = await venasbet(week);
  return concat;
};

const getGames = async (ctx: any) => {
  const week = ctx.req.param.week ? ctx.req.param.week : "";
  return ctx.json({ predictions: await setCahe(week) });
};

app.get("/pool/games/:week", getGames, cache({
  cacheName: 'poolfixture',
  cacheControl: 'max-age=14400',
}));
app.get("/pool/games", getGames, cache({
  cacheName: 'poolfixture',
  cacheControl: 'max-age=14400',
}));

export default app.route("/", app);
