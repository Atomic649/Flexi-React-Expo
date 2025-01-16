import express from "express";
import {
  createBusinessAcc,
  getBusinessAcc,
  getBusinessAccByUserId,
  updateBusinessAcc,
  deleteBusinessAcc,
  searchBusinessAcc,
  getBusinessDetail,
  
} from "../controllers/businessAccController";
import authenticateToken from "../middleware/authMiddleware";

// Create express router
const router = express.Router();

// Create New Business Acc 
router.post("/register", createBusinessAcc);

// Getting all Business Accounts
router.get("/", authenticateToken, getBusinessAcc);

// Getting a Business Account by ID 
router.get("/userId/:userId", getBusinessAccByUserId);

// Getting a Business Detail by ID 
router.get("/detail/:userId", getBusinessDetail);

// Updating a Business Account by ID
router.put("/:id", authenticateToken, updateBusinessAcc);

// Deleting a Business Account by ID 
router.delete("/:id", authenticateToken, deleteBusinessAcc);

// Searching Business Account by keyword 
router.get("/search/:keyword", authenticateToken, searchBusinessAcc);

export default router;
