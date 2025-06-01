import express from "express";

import {
  createEvent,
  getAllEvents,
  getEventById,
} from "../controllers/event-controller.js";
import { roleGuard, verifyToken } from "../middleware/auth-middleware.js";
import { fileUpload } from "../middleware/file-upload-middleware.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, getAllEvents)
  .post(
    verifyToken,
    roleGuard("EVENT_ORGANIZER"),
    fileUpload.fields([
      { name: "imagePreview", maxCount: 3 },
      { name: "imageContent", maxCount: 5 },
    ]),
    createEvent
  );
router
  .route("/:slug")
  .get(verifyToken, roleGuard("EVENT_ORGANIZER"), getEventById);

export default router;
