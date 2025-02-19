import express from 'express';
import authenticateToken from '../middleware/authMiddleware';
import { dailyReport, monthlyReport } from '../controllers/reportController';


// Create express router
const router = express.Router();

// get daily report
router.get('/daily/:memberId', authenticateToken, dailyReport);

// get monthly report
router.get('/monthly/:memberId', authenticateToken, monthlyReport);

export default router;