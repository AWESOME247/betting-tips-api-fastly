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

const meritPredict = async () => {
    const { data } = await axios.get('https://eaglepredict.com/');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(5) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(5) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $("#latestTips tbody tr:nth-child(5) td:nth-child(7)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $("#latestTips tbody tr:nth-child(3) td:nth-child(7)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(1) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(1) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $("#latestTips tbody tr:nth-child(1) td:nth-child(7)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $("#latestTips tbody tr:nth-child(6) td:nth-child(7)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $("#latestTips tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#latestTips tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#latestTips tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $("#latestTips tbody tr:nth-child(4) td:nth-child(7)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    
    return [team3, team1, team5, team2, team4];
}

const venasbet = async () => {
    const { data } = await axios.get('https://www.supatips.com/');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#2 table tbody:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[0],
        away: $("#2 table tbody:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[1],
        league: $("#2 table tbody:nth-child(2) td:nth-child(2)", html).text(),
        tips: $("#2 table tbody:nth-child(2) td:nth-child(4)", html).text(),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#2 table tbody:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[0],
        away: $("#2 table tbody:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[1],
        league: $("#2 table tbody:nth-child(3) td:nth-child(2)", html).text(),
        tips: $("#2 table tbody:nth-child(3) td:nth-child(4)", html).text(),
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $("#2 table tbody:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[0],
        away: $("#2 table tbody:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[1],
        league: $("#2 table tbody:nth-child(4) td:nth-child(2)", html).text(),
        tips: $("#2 table tbody:nth-child(4) td:nth-child(4)", html).text(),
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $("#2 table tbody:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[0],
        away: $("#2 table tbody:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[1],
        league: $("#2 table tbody:nth-child(5) td:nth-child(2)", html).text(),
        tips: $("#2 table tbody:nth-child(5) td:nth-child(4)", html).text(),
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $("#2 table tbody:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[0],
        away: $("#2 table tbody:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' vs ')[1],
        league: $("#2 table tbody:nth-child(6) td:nth-child(2)", html).text(),
        tips: $("#2 table tbody:nth-child(6) td:nth-child(4)", html).text(),
    };
    
    return [team3, team1, team4, team2, team5];
}

const setCahe = async () => {
    const concat = (await meritPredict()).concat(await venasbet());
    return concat;
}

const getGames = async (res: any) => {
    return res.json({predictions: await setCahe()});
}

app.get('/today/games/bet_of_the_day', getGames, cache({
    cacheName: 'todayBET',
    cacheControl: 'max-age=14400',
}))

export default app.route("/", app)