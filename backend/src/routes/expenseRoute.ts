import express from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpenseById, 
  searchExpenseByDate,
  autoDeleteExpense

} from "../controllers/expenseController";
import authenticateToken from "../middleware/authMiddleware";
// Create express router
const router = express.Router();

// Creating a New Expense
router.post("/", authenticateToken, createExpense);

// Getting all Expenses
router.get("/", authenticateToken, getExpenses);

// Getting a Expense by ID 
router.get("/:id", authenticateToken, getExpenseById);

// Updating a Expense by ID
router.put("/:id", authenticateToken, updateExpenseById);



// Searching Expense by date
router.get("/search/:date", authenticateToken, searchExpenseByDate);

// Auto delete if save is false
router.delete("/autoDelete", authenticateToken, autoDeleteExpense);



export default router;
