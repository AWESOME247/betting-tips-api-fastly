import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { todayDate } from "../../mixin/todayDate"
const app = new Hono();

const meritPredict = async () => {
    const { day, month } = todayDate()
    const { data } = await axios.get('https://kingspredict.com/win_either_half');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    
    return [team3, team1, team5, team2, team4];
}

const venasbet = async () => {
    const { day, month } = todayDate()
    const { data } = await axios.get('https://venasbet.com/win_either_half');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html).text(),
        tips: $("#home .table tbody tr:nth-child(2) td:nth-child(4)", html).text(),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html).text(),
        tips: $("#home .table tbody tr:nth-child(3) td:nth-child(4)", html).text(),
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(4) td:nth-child(2)", html).text(),
        tips: $("#home .table tbody tr:nth-child(4) td:nth-child(4)", html).text(),
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(5) td:nth-child(2)", html).text(),
        tips: $("#home .table tbody tr:nth-child(5) td:nth-child(4)", html).text(),
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(6) td:nth-child(2)", html).text(),
        tips: $("#home .table tbody tr:nth-child(6) td:nth-child(4)", html).text(),
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

app.get('/today/games/win_either_halfs', getGames, cache({
    cacheName: 'todayWHEN',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)