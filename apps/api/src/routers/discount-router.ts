import express from "express";
import { createDiscount } from "../controllers/discount-controller.js";

import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post("/", verifyToken, createDiscount);
export default router;
