import express from 'express';
import authenticateToken from '../middleware/authMiddleware';
import dailyReport from '../controllers/reportController';

// Create express router
const router = express.Router();

// get daily report
router.get('/daily/:memberId', authenticateToken, dailyReport);

export default router;