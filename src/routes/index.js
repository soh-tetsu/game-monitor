import express from 'express';
import root from './root.js';
import metrics from './metrics.js';

const router = express.Router();
router.use('/', root);
router.use('/metrics', metrics);

// module.exports = router;
export default router;

