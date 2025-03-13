import express from "express";
import authenticateToken from "../middleware/authMiddleware";
import { pdfExtract, saveDetectExpense} from '../controllers/expensePDFController';
// Create express router
const router = express.Router();


router.post("/pdfExtract", authenticateToken,pdfExtract)

// Save Detect Expense
router.put("/saveDetect", authenticateToken, saveDetectExpense);



export default router;