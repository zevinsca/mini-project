import express from "express";
import {
  getAllCategories,
  getCategoryByName,
} from "../controllers/category-controller.js";

const router = express.Router();

// GET all categories
router.get("/", getAllCategories);

// GET category by name
router.get("/:name", getCategoryByName);

export default router;
