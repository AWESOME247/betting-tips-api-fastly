// src/index.ts
import { Hono } from 'hono'
import route from './games/route'
import { cors } from 'hono/cors'
import { serve } from '@honojs/node-server'
const app = new Hono();

app.use("*", cors({
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://betting.omoyetips.com',
    ],
    allowMethods: ["GET"]
}));

app.route("/", route)

app.get('/', (c) => c.text('Hello Hono!'))

serve(app);