import express from "express";
import { getCurrentUser } from "../controllers/user-contoller.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/current-user").get(verifyToken, getCurrentUser);

export default router;
