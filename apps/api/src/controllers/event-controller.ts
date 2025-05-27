import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function getAllEvents(_req: Request, res: Response) {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error get all events data" });
  }
}

export async function getEventById(req: Request, res: Response) {
  try {
    const { eventId } = req.params;
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Error get event by ID" });
  }
}
