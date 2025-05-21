import express from "express";

import { login, logout, register } from "../controllers/auth-controller.js";
import { verifyToken, roleGuard } from "../middleware/auth-middleware.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(logout);

router.get(
  "/participant-only",
  verifyToken,
  roleGuard("PARTICIPANT"),
  (_req, res) => {
    res.send("Hello Participant!");
  }
);

router.get(
  "/organizer-only",
  verifyToken,
  roleGuard("ORGANIZER"),
  (_req, res) => {
    res.send("Hello Organizer!");
  }
);

export default router;
