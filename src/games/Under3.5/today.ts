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
    const { data } = await axios.get('https://rarabet.com/3_5_goals');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '-3.5',
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '-3.5',
    };     
    const team3: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(5) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '-3.5',
    };     
    const team4: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(1) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '-3.5',
    };     
    const team5: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: '-3.5',
    };     
    return [team1, team5, team2, team4, team3];
}

const venasbet = async () => {
    const { data } = await axios.get('https://venasbet.com/under_3_5_goals');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(2) td:nth-child(2)", html).text(),
        tips: '-3.5',
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(3) td:nth-child(2)", html).text(),
        tips: '-3.5',
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(4) td:nth-child(2)", html).text(),
        tips: '-3.5',
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(5) td:nth-child(2)", html).text(),
        tips: '-3.5',
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $("#home .table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $("#home .table tbody tr:nth-child(6) td:nth-child(2)", html).text(),
        tips: '-3.5',
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

app.get('/today/games/under3.5', getGames, cache({
    cacheName: 'todayUn3.5',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)