
const express = require('express');
const router = express.Router();
const { getMetrics, contentType } = require('../metrics/metrics');


router.get('/', async (req, res) => {
    try {
        res.set('Content-Type', contentType);
        res.end(await getMetrics());
    } catch (ex) {
        console.error(ex);
        res.status(500).end(ex.toString());
    }
});

module.exports = router;
