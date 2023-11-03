import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

const app = new Hono();

const meritPredict = async () => {
  const {month, yesterday } = yesterdayDate();
  const { data } = await axios.get("https://www.soccervital.com/bet/?sh=-1");
  const html = data;
  const $ = cheerio.load(html);
  const teams: any = [];
  $(".center .main tbody tr").each((i, el) => {
    const date = `${month} ${yesterday}`;
    const cells = $(el).find("td");
    if (cells.length === 2) {
      const league = $($(el).find(".headupe a"))
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      teams.push({ league });
    } else if (cells.length === 4) {
      const home = $($(el).find(".twom .home .homeflex .hometeam"))
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const away = $($(el).find(".twom .away .awayflex .awayteam"))
        .text()
        ?.replace(/[^\w\s]/gi, "")
        ?.replace(/[\n\t]/g, "")
        ?.trim();
      const tips = $($(el).find(".twom .center260")).text()?.trim();
      teams.push({
        date,
        home,
        away,
        league: teams[teams.length - 1].league,
        tips,
      });
    }
  });
  const filter = teams.filter((name: any) => name.home);
  return [...filter];
};

const setCahe = async () => {
  const concat = await meritPredict();
  return concat;
};

const getGames = async (res: any) => {
  return res.json({ predictions: await setCahe() });
};

app.get("/yesterday/games/straigth_only", getGames, cache({
  cacheName: 'yesterdaySureStraigthWin',
  cacheControl: 'max-age=14400',
}));

export default app.route("/", app);
