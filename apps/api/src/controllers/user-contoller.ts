import { Request, Response } from "express";

export function getCurrentUser(req: Request, res: Response) {
  try {
    const user = req.user;
    res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to find user" });
  }
}
