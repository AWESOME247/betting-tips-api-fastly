import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

const app = new Hono();

const venasbet = async () => {
    const {month, yesterday, day, lastMonth, year} = yesterdayDate();
    const { data } = await axios.get(`https://www.r2bet.com/?dt=${year}-${
        day === 1 ? lastMonth : lastMonth + 1
      }-${yesterday}`);
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${yesterday}`,
        home: $("#home tbody tr:nth-child(7) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(7) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(7) td:nth-child(1)", html).text(),
        tips: $("#home tbody tr:nth-child(7) td:nth-child(3)", html).text(),
        score: $("#home tbody tr:nth-child(7) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team2: object = {
        date: `${month} ${yesterday}`,
        home: $("#home tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(2) td:nth-child(1)", html).text(),
        tips: $("#home tbody tr:nth-child(2) td:nth-child(3)", html).text(),
        score: $("#home tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team3: object = {
        date: `${month} ${yesterday}`,
        home: $("#home tbody tr:nth-child(8) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(8) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(8) td:nth-child(1)", html).text(),
        tips: $("#home tbody tr:nth-child(8) td:nth-child(3)", html).text(),
        score: $("#home tbody tr:nth-child(8) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team4: object = {
        date: `${month} ${yesterday}`,
        home: $("#home tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(3) td:nth-child(1)", html).text(),
        tips: $("#home tbody tr:nth-child(3) td:nth-child(3)", html).text(),
        score: $("#home tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team5: object = {
        date: `${month} ${yesterday}`,
        home: $("#home tbody tr:nth-child(1) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(1) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(1) td:nth-child(1)", html).text(),
        tips: $("#home tbody tr:nth-child(1) td:nth-child(3)", html).text(),
        score: $("#home tbody tr:nth-child(1) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    
    return [team5, team3, team2, team4, team1];
}

const setCaheY = async () => {
    const concat = await venasbet();
    return concat;
}

const getGamesY = async (res: any) => {
    return res.json({predictions: await setCaheY()});
}

app.get('/yesterday/games/4odds', getGamesY, cache({
    cacheName: 'yesterdays4odds',
    cacheControl: 'max-age=14400',
}));

// Today

const today = async () => {
    const { data } = await axios.get('https://www.r2bet.com');
    const {month, yesterday } = yesterdayDate();
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${yesterday + 1}`,
        home: $("#home tbody tr:nth-child(7) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(7) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(7) td:nth-child(2)", html).text(),
        tips: $("#home tbody tr:nth-child(7) td:nth-child(4)", html).text(),
    };
    const team2: object = {
        date: `${month} ${yesterday + 1}`,
        home: $("#home tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(2) td:nth-child(2)", html).text(),
        tips: $("#home tbody tr:nth-child(2) td:nth-child(4)", html).text(),
    };
    const team3: object = {
        date: `${month} ${yesterday + 1}`,
        home: $("#home tbody tr:nth-child(8) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(8) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(8) td:nth-child(2)", html).text(),
        tips: $("#home tbody tr:nth-child(8) td:nth-child(4)", html).text(),
    };
    const team4: object = {
        date: `${month} ${yesterday + 1}`,
        home: $("#home tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(3) td:nth-child(2)", html).text(),
        tips: $("#home tbody tr:nth-child(3) td:nth-child(4)", html).text(),
    };
    const team5: object = {
        date: `${month} ${yesterday + 1}`,
        home: $("#home tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home tbody tr:nth-child(1) td:nth-child(2)", html).text(),
        tips: $("#home tbody tr:nth-child(1) td:nth-child(4)", html).text(),
    };
    
    return [team5, team3, team2, team4, team1];
}


const setCahe = async () => {
    const concat = await today();
    return concat;
}

const getGames = async (res: any) => {
    return res.json({predictions: await setCahe()});
}
app.get('/today/games/4odds', getGames, cache({
    cacheName: 'yesterdays4odds',
    cacheControl: 'max-age=14400',
}))
export default app.route("/", app)