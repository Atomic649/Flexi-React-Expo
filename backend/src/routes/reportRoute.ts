import express from 'express';
import { dailyReport } from '../controllers/reportController';
import authenticateToken from '../middleware/authMiddleware';

// Create express router
const router = express.Router();

// get daily report
router.get('/daily/:businessAcc', authenticateToken, dailyReport);

export default router;