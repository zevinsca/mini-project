import express, { Request, Response, Application } from "express";
import authRouters from "./routers/auth-router.js";
import cors from "cors";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.get("/api/v1/health", (_req: Request, res: Response) => {
  res.status(200).json({ message: "API running" });
});

app.use("/api/v1/auth", authRouters);

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
