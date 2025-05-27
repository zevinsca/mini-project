import express from "express";

import { getAllEvents } from "../controllers/event-controller.js";

const router = express.Router();

router.route("/").get(getAllEvents);

export default router;
