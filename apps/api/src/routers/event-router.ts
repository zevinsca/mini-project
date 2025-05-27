import express from "express";

import { getAllEvents, getEventById } from "../controllers/event-controller.js";

const router = express.Router();

router.route("/").get(getAllEvents);
router.route("/:eventId").get(getEventById);

export default router;
