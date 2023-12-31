import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

const app = new Hono();

const meritPredict = async () => {
  const {month, yesterday} = yesterdayDate();
  const { data } = await axios.get("https://rarabet.com/draws");
  const html = data;
  const $ = cheerio.load(html);
  const team2: object = {
    date: `${month} ${yesterday}`,
    home: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(2)",
      html
    )
      .text()
      .replace(/[^a-zA-Z0-9]/g, ""),
    tips: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(4)",
      html
    )
      .text()
      .replace(/[^a-zA-Z0-9]/g, ""),
    score: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(5)",
      html
    )
      .text()
      .replace(/\s/g, ""),
  };
  const team5: object = {
    date: `${month} ${yesterday}`,
    home: $(
      ".content section:nth-child(1) table tbody tr:nth-child(4) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $(
      ".content section:nth-child(1) table tbody tr:nth-child(4) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      ".content section:nth-child(1) table tbody tr:nth-child(4) td:nth-child(2)",
      html
    )
      .text()
      .replace(/[^a-zA-Z0-9]/g, ""),
    tips: $(
      ".content section:nth-child(1) table tbody tr:nth-child(4) td:nth-child(4)",
      html
    )
      .text()
      .replace(/[^a-zA-Z0-9]/g, ""),
    score: $(
      ".content section:nth-child(1) table tbody tr:nth-child(4) td:nth-child(5)",
      html
    )
      .text()
      .replace(/\s/g, ""),
  };

  return [team5, team2];
};

const venasbet = async () => {
  const {month, yesterday } = yesterdayDate();
  const { data } = await axios.get(`https://betgaranteed.com/draws`);
  const html = data;
  const $ = cheerio.load(html);
  const team1: object = {
    date: `${month} ${yesterday}`,
    home: $(
      ".content section:nth-child(1) table tbody tr:nth-child(2) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $(
      ".content section:nth-child(1) table tbody tr:nth-child(2) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      ".content section:nth-child(1) table tbody tr:nth-child(2) td:nth-child(2)",
      html
    ).text(),
    tips: "X",
    score: $(
      ".content section:nth-child(1) table tbody tr:nth-child(2) td:nth-child(5)",
      html
    )
      .text()
      .replace(/[\n]/, ""),
  };
  const team2: object = {
    date: `${month} ${yesterday}`,
    home: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[0],
    away: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(3)",
      html
    )
      .text()
      .replace(/[\n\t]/g, "")
      .split("VS")[1],
    league: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(2)",
      html
    ).text(),
    tips: "X",
    score: $(
      ".content section:nth-child(1) table tbody tr:nth-child(3) td:nth-child(5)",
      html
    )
      .text()
      .replace(/[\n]/, ""),
  };

  return [team1, team2];
};

const setCahe = async () => {
  const concat = (await meritPredict()).concat(await venasbet());
  return concat;
};

const getGames = async (res: any) => {
  return res.json({ predictions: await setCahe() });
};

app.get(
  "/yesterday/games/draw",
  getGames,
  cache({
    cacheName: "yesterdayDraw",
    cacheControl: "max-age=14400",
  })
);

export default app.route("/", app);
