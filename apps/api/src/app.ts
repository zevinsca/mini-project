import express, { Request, Response, Application } from "express";
import "dotenv/config.js";
import cors from "cors";

import eventRouters from "./routers/event-router.js";

const app: Application = express();
const PORT: number = (process.env.PORT as unknown as number) || 8000;

app.use(cors());

app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "API running" });
});

app.use("/api/v1/events", eventRouters);

app.listen(PORT, () => {
  console.info(`Server is listening on http://localhost:${PORT}`);
});
