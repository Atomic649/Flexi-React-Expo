import express from "express";
import authenticateToken from "../middleware/authMiddleware";
import { extractPdf } from "../controllers/pdfController";
// Create express router
const router = express.Router();

// Import pdf controller
router.get("/extract", authenticateToken,extractPdf)




export default router;