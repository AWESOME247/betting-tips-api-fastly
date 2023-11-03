import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";
import { yesterdayDate } from "../../mixin/yesterdayDate";

const app = new Hono();

const meritPredict = async () => {
    const { data } = await axios.get('https://zakabet.com/over-1-5-goals-2/');
    const {month, yesterday } = yesterdayDate();
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${yesterday}`,
        home: $("#tab-1 table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[0],
        away: $("#tab-1 table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[1],
        league: $("#tab-1 table tbody tr:nth-child(2) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+1.5',
        score: $("#tab-1 table tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team2: object = {
        date: `${month} ${yesterday}`,
        home: $("#tab-1 table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[0],
        away: $("#tab-1 table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[1],
        league: $("#tab-1 table tbody tr:nth-child(3) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+1.5',
        score: $("#tab-1 table tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team3: object = {
        date: `${month} ${yesterday}`,
        home: $("#tab-1 table tbody tr:nth-child(4) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[0],
        away: $("#tab-1 table tbody tr:nth-child(4) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[1],
        league: $("#tab-1 table tbody tr:nth-child(4) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+1.5',
        score: $("#tab-1 table tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team4: object = {
        date: `${month} ${yesterday}`,
        home: $("#tab-1 table tbody tr:nth-child(5) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[0],
        away: $("#tab-1 table tbody tr:nth-child(5) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[1],
        league: $("#tab-1 table tbody tr:nth-child(5) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+1.5',
        score: $("#tab-1 table tbody tr:nth-child(5) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    const team5: object = {
        date: `${month} ${yesterday}`,
        home: $("#tab-1 table tbody tr:nth-child(6) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[0],
        away: $("#tab-1 table tbody tr:nth-child(6) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('Vs ')[1],
        league: $("#tab-1 table tbody tr:nth-child(6) td:nth-child(1)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '+1.5',
        score: $("#tab-1 table tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/\s/g, ''),
    };
    
    return [team4, team1, team3, team2, team5];
}

const venasbet = async () => {
    const {month, yesterday, day, lastMonth, year} = yesterdayDate();
    const { data } = await axios.get(`https://venasbet.com/over_1_5_goals?dt=${year}-${
        day === 1 ? lastMonth : lastMonth + 1
      }-${yesterday}`);
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${yesterday}`,
        home: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(2) td:nth-child(1)", html).text(),
        tips: '+1.5',
        score: $("#home .table tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/[\n]/, ''),
    };
    const team2: object = {
        date: `${month} ${yesterday}`,
        home: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(3) td:nth-child(1)", html).text(),
        tips: '+1.5',
        score: $("#home .table tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[\n]/, ''),
    };
    const team3: object = {
        date: `${month} ${yesterday}`,
        home: $("#home .table tbody tr:nth-child(4) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(4) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(4) td:nth-child(1)", html).text(),
        tips: '+1.5',
        score: $("#home .table tbody tr:nth-child(4) td:nth-child(4)", html).text().replace(/[\n]/, ''),
    };
    const team4: object = {
        date: `${month} ${yesterday}`,
        home: $("#home .table tbody tr:nth-child(5) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(5) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(5) td:nth-child(1)", html).text(),
        tips: '+1.5',
        score: $("#home .table tbody tr:nth-child(5) td:nth-child(4)", html).text().replace(/[\n]/, ''),
    };
    const team5: object = {
        date: `${month} ${yesterday}`,
        home: $("#home .table tbody tr:nth-child(6) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(6) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(6) td:nth-child(1)", html).text(),
        tips: '+1.5',
        score: $("#home .table tbody tr:nth-child(6) td:nth-child(4)", html).text().replace(/[\n]/, ''),
    };
    
    return [team4, team1, team3, team2, team5];
}

const setCahe = async () => {
    const concat = (await meritPredict()).concat(await venasbet());
    return concat;
}

const getGames = async (res: any) => {
    return res.json({predictions: await setCahe()});
}

app.get('/yesterday/games/over1.5', getGames, cache({
    cacheName: 'yesterdayover1.5',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)