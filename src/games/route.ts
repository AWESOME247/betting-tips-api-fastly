import { Hono } from "hono";
import { route as today } from "./1x2/today";
import todayO1 from "./Over1.5/today";
import todayO2 from "./Over2.5/today";
import todayO3 from "./Over3.5/today";
import todayBTTS from "./BTTS/today";
import todayDC from "./DoubleCH/today";
import todayWEH from "./WEH/today";
import todayHan from "./Handicap/today";
import todayBet from "./BET/today";
import todayDraw from "./Draw/today";
import todayU3 from "./Under3.5/today";
import today0 from "./Over0.5/today";
import straightWin from "./StraightWin/today";
import straightWinY from "./StraightWin/yesterday";
import yesterday from "./1x2/yesterday";
import yesterdayBET from "./BET/yesterday";
import yesterdayO1 from "./Over1.5/yesterday";
import yesterdayO2 from "./Over2.5/yesterday";
import yesterdayO3 from "./Over3.5/yesterday";
import yesterdayBTTS from "./BTTS/yesterday";
import yesterdayDC from "./DoubleCH/yesterday";
import yesterdayDraw from "./Draw/yesterday";
import yesterdayWEH from "./WEH/yesterday";
import yesterdayHan from "./Handicap/yesterday";
import yesterdayU3 from "./Under3.5/yesterday";
import yesterday0 from "./Over0.5/yesterday";
// SureOdds
import OddsOf2 from "./sureOdds/2odds";
import OddsOf3 from "./sureOdds/3odds";
import OddsOf4 from "./sureOdds/4odds";

// Pool Fixtures
import poolFixtures from "./Pool/fixtures";
import poolWeeklyFixtures from "./Pool/Weeks";
// Zoom Soccer
// import EnglishPremierLeague from './zoom/english'
// import SpainishLeage from './zoom/spain'
// import ItalyLeague from './zoom/italy'
// import GermanyLeague from './zoom/germany'
// import FranceLeague from './zoom/france'
// import HollandLeague from './zoom/holland'
// import PortugalLeague from './zoom/portugal'
const route = new Hono();

//SureOdds

route.route('/', OddsOf3);
route.route('/', OddsOf2);
route.route('/', OddsOf4);

// Pool Fixtures
route.route('/', poolFixtures);
route.route('/', poolWeeklyFixtures);

// zoom Soccer
// route.route(EnglishPremierLeague)
// route.route(SpainishLeage)
// route.route(ItalyLeague)
// route.route(GermanyLeague)
// route.route(FranceLeague)
// route.route(HollandLeague)
// route.route(PortugalLeague)

route.route("/", today);
route.route("/", todayBet);
route.route("/", todayO1);
route.route("/", todayO2);
route.route("/", todayO3);
route.route("/", todayU3);
route.route("/", todayBTTS);
route.route("/", todayDraw);
route.route("/", todayDC);
route.route("/", todayWEH);
route.route("/", todayHan);
route.route("/", today0);
route.route("/", yesterday);
route.route("/", yesterdayBET);
route.route("/", yesterdayO1);
route.route("/", yesterdayO2);
route.route("/", yesterdayO3);
route.route("/", yesterdayU3);
route.route("/", yesterdayBTTS);
route.route("/", yesterdayDC);
route.route("/", yesterdayWEH);
route.route("/", yesterdayDraw);
route.route("/", yesterdayHan);
route.route("/", yesterday0);
route.route("/", straightWin);
route.route("/", straightWinY);

export default route;
