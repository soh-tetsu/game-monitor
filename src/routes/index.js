const express = require('express');
const router = express.Router();


router.use('/', require('./root'));
router.use('/metrics', require('./metrics'));

module.exports = router;

