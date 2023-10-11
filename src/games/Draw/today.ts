import { Hono } from "hono";
import { cache } from "hono/cache";
import * as cheerio from "cheerio";
import axios from "redaxios";

// Variables
const app = new Hono();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const d = new Date();
const month = months[d.getMonth()];
const day = d.getDate();

const meritPredict = async () => {
    const { data } = await axios.get('https://rarabet.com/draws');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    }
    
    return [team1, team2,];
}

const venasbet = async () => {
    const { data } = await axios.get('https://betgaranteed.com/draws');
    const html = data;
    const $ = cheerio.load(html);
    const team1: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(2) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    };
    const team2: object = {
        date: `${month} ${day}`,
        home: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[0],
        away: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(3)", html).text().replace(/[\n\t]/g, '').split('VS')[1],
        league: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(2)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
        tips: $(".content section:nth-child(2) table tbody tr:nth-child(3) td:nth-child(4)", html).text().replace(/[^a-zA-Z0-9]/g, ''),
    }; 
    return [team1, team2];
}

const setCahe = async () => {
    const concat = (await meritPredict()).concat(await venasbet());
    return concat;
}

const getGames = async (res: any) => {
    return res.json({predictions: await setCahe()});
}

app.get('/today/games/draw', getGames, cache({
    cacheName: 'todayDraw',
    cacheControl: 'max-age=14400',
}))


export default app.route("/", app)