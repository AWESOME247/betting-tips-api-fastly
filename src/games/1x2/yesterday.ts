import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

// Variables
const app = new Hono();

const meritPredict = async () => {
  const {month, yesterday, day, lastMonth, year} = yesterdayDate();
  const { data } = await axios.get(`https://www.r2bet.com/?dt=${year}-${
    day === 1 ? lastMonth : lastMonth + 1
  }-${yesterday}`);
  const html = data;
  const $ = cheerio.load(html);
  const team1: object = {
    date: `${month} ${yesterday}`,
    home: $("#home tbody tr:nth-child(2) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home tbody tr:nth-child(2) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#home tbody tr:nth-child(2) td:nth-child(1)", html).text(),
    tips: $("#home tbody tr:nth-child(2) td:nth-child(3)", html).text(),
    score: $("#home tbody tr:nth-child(2) td:nth-child(4)", html)
      .text()
      .replace(/\s/g, ""),
  };
  const team2: object = {
    date: `${month} ${yesterday}`,
    home: $("#home tbody tr:nth-child(3) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home tbody tr:nth-child(3) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#home tbody tr:nth-child(3) td:nth-child(1)", html).text(),
    tips: $("#home tbody tr:nth-child(3) td:nth-child(3)", html).text(),
    score: $("#home tbody tr:nth-child(3) td:nth-child(4)", html)
      .text()
      .replace(/\s/g, ""),
  };
  const team3: object = {
    date: `${month} ${yesterday}`,
    home: $("#home tbody tr:nth-child(4) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home tbody tr:nth-child(4) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#home tbody tr:nth-child(4) td:nth-child(1)", html).text(),
    tips: $("#home tbody tr:nth-child(4) td:nth-child(3)", html).text(),
    score: $("#home tbody tr:nth-child(4) td:nth-child(4)", html)
      .text()
      .replace(/\s/g, ""),
  };
  const team4: object = {
    date: `${month} ${yesterday}`,
    home: $("#home tbody tr:nth-child(5) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home tbody tr:nth-child(5) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#home tbody tr:nth-child(5) td:nth-child(1)", html).text(),
    tips: $("#home tbody tr:nth-child(5) td:nth-child(3)", html).text(),
    score: $("#home tbody tr:nth-child(5) td:nth-child(4)", html)
      .text()
      .replace(/\s/g, ""),
  };
  const team5: object = {
    date: `${month} ${yesterday}`,
    home: $("#home tbody tr:nth-child(6) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home tbody tr:nth-child(6) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#home tbody tr:nth-child(6) td:nth-child(1)", html).text(),
    tips: $("#home tbody tr:nth-child(6) td:nth-child(3)", html).text(),
    score: $("#home tbody tr:nth-child(6) td:nth-child(4)", html)
      .text()
      .replace(/\s/g, ""),
  };

  return [team5, team3, team2, team4, team1];
};

const venasbet = async () => {
  const {month, yesterday, day, lastMonth, year} = yesterdayDate();
  const { data } = await axios.get(
    `https://venasbet.com/?dt=${year}-${
      day === 1 ? lastMonth : lastMonth + 1
    }-${yesterday}`
  );
  const html = data;
  const $ = cheerio.load(html);
  const team1: object = {
    date: `${month} ${yesterday}`,
    home: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(2) td:nth-child(1)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text(),
    score: $("#home .table tbody tr:nth-child(2) td:nth-child(4)", html)
      .text()
      .replace(/[\n]/, ""),
  };
  const team2: object = {
    date: `${month} ${yesterday}`,
    home: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(3) td:nth-child(1)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text(),
    score: $("#home .table tbody tr:nth-child(3) td:nth-child(4)", html)
      .text()
      .replace(/[\n]/, ""),
  };
  const team3: object = {
    date: `${month} ${yesterday}`,
    home: $("#home .table tbody tr:nth-child(4) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(4) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(4) td:nth-child(1)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html).text(),
    score: $("#home .table tbody tr:nth-child(4) td:nth-child(4)", html)
      .text()
      .replace(/[\n]/, ""),
  };
  const team4: object = {
    date: `${month} ${yesterday}`,
    home: $("#home .table tbody tr:nth-child(5) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(5) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(5) td:nth-child(1)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html).text(),
    score: $("#home .table tbody tr:nth-child(5) td:nth-child(4)", html)
      .text()
      .replace(/[\n]/, ""),
  };
  const team5: object = {
    date: `${month} ${yesterday}`,
    home: $("#home .table tbody tr:nth-child(6) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(6) td:nth-child(2)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(6) td:nth-child(1)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html).text(),
    score: $("#home .table tbody tr:nth-child(6) td:nth-child(4)", html)
      .text()
      .replace(/[\n]/, ""),
  };

  return [team4, team1, team3, team2, team5];
};

const setCahe = async () => {
  const concat = (await venasbet()).concat(await meritPredict());
  return concat;
};

const getGames = async (ctx: any) => {
  return ctx.json({ predictions: await setCahe() });
};

app.get(
  "/yesterday/games/1x2",
  getGames,
  cache({
    cacheName: "yesterday1x2",
    cacheControl: "max-age=14400",
  })
);

app.route("/", app);

export default app;
