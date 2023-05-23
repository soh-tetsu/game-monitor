
// const express = require('express');

import express from 'express';
const router = express.Router();

router.get('/', (_, res) => {
    res.send('hello, world!');
});

// module.exports = router;

export default router;
