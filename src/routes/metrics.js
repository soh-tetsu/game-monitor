
// const express = require('express');
// const { getMetrics, contentType } = require('../metrics/metrics');

import express from 'express';
import { getMetrics, contentType } from '../metrics/metrics.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.set('Content-Type', contentType);
        res.end(await getMetrics());
    } catch (ex) {
        console.error(ex);
        res.status(500).end(ex.toString());
    }
});

// module.exports = router;
export default router;
