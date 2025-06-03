import express from "express";
import { getEventStats } from "../controllers/stats-controller.js";

const router = express.Router();

router.route("/").get(getEventStats); // GET /api/v1/stats/

export default router;
