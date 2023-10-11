import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

// Variables
const app= new Hono();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const d = new Date();
const month = months[d.getMonth()];
const day = d.getDate();

const meritPredict = async () => {
    const { data } = await axios.get('https://holyodds.com/0_5_HT');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0]?.trim(),
        away: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1]?.trim(),
        league: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').trim(),
        tips: 'Over0.5HT',
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0]?.trim(),
        away: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1]?.trim(),
        league: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').trim(),
        tips: 'Over0.5HT',
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0]?.trim(),
        away: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1]?.trim(),
        league: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(4) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').trim(),
        tips: 'Over0.5HT',
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0]?.trim(),
        away: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1]?.trim(),
        league: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(5) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').trim(),
        tips: 'Over0.5HT',
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0]?.trim(),
        away: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1]?.trim(),
        league: $("#nav-tabContent .tab-content div:nth-child(2) table tbody tr:nth-child(6) td:nth-child(2)", html).text().replace(/[\n\t]/g, '').trim(),
        tips: 'Over0.5HT',
    };
    
    return [team4, team1, team3, team2, team5];
}

const venasbet = async () => {
    const { data } = await axios.get('https://rarabet.com/0_5_ht');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(2)", html).text(),
        tips: 'Over0.5HT',
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(2)", html).text(),
        tips: 'Over0.5HT',
    };
    const team3: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(4) td:nth-child(2)", html).text(),
        tips: 'Over0.5HT',
    };
    const team4: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(5) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(5) td:nth-child(2)", html).text(),
        tips: 'Over0.5HT',
    };
    const team5: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split(' VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(6) td:nth-child(2)", html).text(),
        tips: 'Over0.5HT',
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

app.get('/today/games/over0.5HT', getGames, cache({
    cacheName: 'yesterdayover0.5HT',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)