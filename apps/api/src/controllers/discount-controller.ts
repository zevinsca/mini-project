import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDiscount(req: Request, res: Response) {
  try {
    const { eventId, startDate, endDate, amount } = req.body;

    // Validation (basic example)
    if (!eventId || !startDate || !endDate || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create the discount
    const discount = await prisma.discount.create({
      data: {
        eventId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        amount: parseInt(amount, 10),
      },
    });

    res.status(201).json(discount);
  } catch (error) {
    console.error("Error creating discount:", error);
    res.status(500).json({ message: "Failed to create discount" });
  }
}
