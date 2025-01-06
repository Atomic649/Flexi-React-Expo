import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByMemberId,
} from "../controllers/productController";
import authenticateToken from "../middleware/authMiddleware";
// create express router
const router = express.Router();

// Create product route
router.post("/", authenticateToken, createProduct);

// Get all products
router.get("/", authenticateToken, getProducts);

// Get product by ID
router.get("/:id", authenticateToken, getProductById);

// Delete product
router.delete("/:id", authenticateToken, deleteProduct);

// Update product
router.put("/:id", authenticateToken, updateProduct);

//Get product by member ID
router.get("/member/:memberId", authenticateToken, getProductByMemberId);

export default router;
