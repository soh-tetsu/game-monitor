import express from 'express';
import routes from './src/routes/index.js';
import { updateMetrics } from './src/metrics/metrics.js';
import {collectDefaultMetrics} from 'prom-client';
import fs from 'fs';

const config = JSON.parse(fs.readFileSync('./config.json'));

const FETCH_INTERVAL = config.fetch_interval || 60 * 1000;


const app = express();
const port = config.server_port || 3000;

app.use(routes);

// collect default nodejs metrics
collectDefaultMetrics({
    labels: {
        app: 'game-observer',
        owner: 'sre@ctw.inc',
    }
});

// Start the game server metrics collection
updateMetrics(FETCH_INTERVAL, config.sources);

app.listen(port, '0.0.0.0', () => {
    console.log(`Hello World app listening at http://0.0.0.0:${port}`);
});

