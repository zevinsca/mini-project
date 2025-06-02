import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, Application } from "express";
import authRouters from "./routers/auth-router.js";
import eventRouters from "./routers/event-router.js";
import categoryRouters from "./routers/category-router.js";
import imageRouters from "./routers/image-router.js";
import transactionRouter from "./routers/transaction-router.js";
import userRouter from "./routers/user-router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API running" });
});

app.use("/api/v1/auth", authRouters);
app.use("/api/v1/events", eventRouters);
app.use("/api/v1/images", imageRouters);
app.use("/api/v1/categories", categoryRouters);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/user", userRouter);

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
