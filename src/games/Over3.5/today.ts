import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { todayDate } from "../../mixin/todayDate"

const app = new Hono();

const meritPredict = async () => {
    const { day, month } = todayDate()
    const { data } = await axios.get('https://kingspredict.com/over_3_5_goals');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+3.5',
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+3.5',
    };
    
    return [team1, team2];
}

const venasbet = async () => {
    const { day, month } = todayDate()
    const { data } = await axios.get('https://venasbet.com/over_3_5_goals');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html).text(),
        tips: '+3.5',
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html).text(),
        tips: '+3.5',
    };
    
    return [team1, team2,];
}

const setCahe = async () => {
    const concat = (await meritPredict()).concat(await venasbet());
    return concat;
}

const getGames = async (res: any) => {
    return res.json({predictions: await setCahe()});
}

app.get('/today/games/over3.5', getGames, cache({
    cacheName: 'todayOv3',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)