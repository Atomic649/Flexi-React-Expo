import express from "express";
import authenticateToken from "../middleware/authMiddleware";
import { pdfExtract} from '../controllers/expensePDFController';
// Create express router
const router = express.Router();


router.get("/pdfExtract", authenticateToken,pdfExtract)



export default router;