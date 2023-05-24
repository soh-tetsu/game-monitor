import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    // console.log(`/ get req ${req}`);
    res.send('Monitoring games running on CPP.');
});

export default router;
