import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

const app = new Hono();

const meritPredict = async () => {
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
  const { data } = await axios.get("https://www.r2bet.com/merit_prediction");
  const html = data;
  const $ = cheerio.load(html);
  const team1: object = {
    date: `${month} ${day}`,
    home: $("#profile tbody tr:nth-child(2) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#profile tbody tr:nth-child(2) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#profile tbody tr:nth-child(2) td:nth-child(2)", html).text(),
    tips: $("#profile tbody tr:nth-child(2) td:nth-child(4)", html).text(),
  };
  const team2: object = {
    date: `${month} ${day}`,
    home: $("#profile tbody tr:nth-child(3) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#profile tbody tr:nth-child(3) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#profile tbody tr:nth-child(3) td:nth-child(2)", html).text(),
    tips: $("#profile tbody tr:nth-child(3) td:nth-child(4)", html).text(),
  };
  const team3: object = {
    date: `${month} ${day}`,
    home: $("#profile tbody tr:nth-child(4) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#profile tbody tr:nth-child(4) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#profile tbody tr:nth-child(4) td:nth-child(2)", html).text(),
    tips: $("#profile tbody tr:nth-child(4) td:nth-child(4)", html).text(),
  };
  const team4: object = {
    date: `${month} ${day}`,
    home: $("#profile tbody tr:nth-child(5) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#profile tbody tr:nth-child(5) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#profile tbody tr:nth-child(5) td:nth-child(2)", html).text(),
    tips: $("#profile tbody tr:nth-child(5) td:nth-child(4)", html).text(),
  };
  const team5: object = {
    date: `${month} ${day}`,
    home: $("#profile tbody tr:nth-child(6) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#profile tbody tr:nth-child(6) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $("#profile tbody tr:nth-child(6) td:nth-child(2)", html).text(),
    tips: $("#profile tbody tr:nth-child(6) td:nth-child(4)", html).text(),
  };

  return [team5, team3, team2, team4, team1];
};

const venasbet = async () => {
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
  const { data } = await axios.get("https://venasbet.com");
  const html = data;
  const $ = cheerio.load(html);
  const team1: object = {
    date: `${month} ${day}`,
    home: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(2) td:nth-child(2)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(2) td:nth-child(4)", html).text(),
  };
  const team2: object = {
    date: `${month} ${day}`,
    home: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(3) td:nth-child(2)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(3) td:nth-child(4)", html).text(),
  };
  const team3: object = {
    date: `${month} ${day}`,
    home: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(4) td:nth-child(2)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(4) td:nth-child(4)", html).text(),
  };
  const team4: object = {
    date: `${month} ${day}`,
    home: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(5) td:nth-child(2)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(5) td:nth-child(4)", html).text(),
  };
  const team5: object = {
    date: `${month} ${day}`,
    home: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html)
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      "#home .table tbody tr:nth-child(6) td:nth-child(2)",
      html
    ).text(),
    tips: $("#home .table tbody tr:nth-child(6) td:nth-child(4)", html).text(),
  };

  return [team4, team1, team3, team2, team5];
};

const setCahe = async () => {
  const concat = (await meritPredict()).concat(await venasbet());
  return concat;
};

app.get("/today/games/1x2", async (ctx) => {
  return ctx.json({ predictions: await setCahe() });
}, cache({
    cacheName: 'today1x2',
    cacheControl: 'max-age=14400',
}));

export const route = app.route("/", app)
