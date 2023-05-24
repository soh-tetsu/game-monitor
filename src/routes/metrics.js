import express from 'express';
import { getMetrics, contentType } from '../metrics/metrics.js';

const router = express.Router();

router.get('/', async (req, res) => {
    // console.log(`/metrics get req ${req}`);
    try {
        res.set('Content-Type', contentType);
        res.end(await getMetrics());
    } catch (err) {
        console.error(err);
        res.status(500).end(err.toString());
    }
});

export default router;
