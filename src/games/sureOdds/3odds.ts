import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

const app = new Hono();

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const d = new Date();
const month = months[d.getMonth()];
const day = d.getDate();

const venasbet = async () => {
    const { data } = await axios.get('https://eaglepredict.com/today-football-predictions');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(2) td:nth-child(3)", html).text(),
        tips: $("#latestTips tbody tr:nth-child(2) td:nth-child(7)", html).text(),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(3) td:nth-child(3)", html).text(),
        tips: $("#latestTips tbody tr:nth-child(3) td:nth-child(7)", html).text(),
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(4) td:nth-child(3)", html).text(),
        tips: $("#latestTips tbody tr:nth-child(4) td:nth-child(7)", html).text(),
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(5) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(5) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(5) td:nth-child(3)", html).text(),
        tips: $("#latestTips tbody tr:nth-child(5) td:nth-child(7)", html).text(),
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(6) td:nth-child(3)", html).text(),
        tips: $("#latestTips tbody tr:nth-child(6) td:nth-child(7)", html).text(),
    };
    
    return [team5, team3, team2, team4, team1];
}

const setCahe = async () => {
    const concat = await venasbet();
    return concat;
}

const getGames = async (res: any) => {
    return res.json({predictions: await setCahe()});
}

app.get('/today/games/3odds', getGames, cache({
    cacheName: 'today3odds',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)