import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/client.js";
import { MidtransClient } from "midtrans-node-client";
import { v7 as uuid } from "uuid";

const prisma = new PrismaClient();
const snap = new MidtransClient.Snap({
  isProduction: process.env.NODE_ENV === "production" ? true : false,
  serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY,
});

export async function createTransaction(req: Request, res: Response) {
  try {
    const { eventId, ticketAmount } = req.body;
    const userId = req.user.id;
    const event = await prisma.event.findUnique({ where: { id: eventId } });

    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const totalPrice = ticketAmount * event.price;
    const localId = uuid();

    await prisma.$transaction(async (tx) => {
      // Our own transaction
      await tx.transaction.create({
        data: {
          id: localId,
          eventId,
          userId,
          ticketAmount,
          priceAmount: totalPrice,
        },
      });

      await tx.event.update({
        where: { id: eventId },
        data: { stock: { decrement: ticketAmount } },
      });
    });

    // Midtrans transaction
    const midtransTransaction = await snap.createTransaction({
      transaction_details: {
        order_id: localId,
        gross_amount: totalPrice,
      },
      item_details: [
        {
          id: event.id,
          name: event.name,
          quantity: ticketAmount,
          price: event.price,
        },
      ],
      customer_details: {
        first_name: req.user.name,
        email: req.user.email,
      },
    });

    res.status(201).json({
      message: "Transaction created",
      data: { midtransTransaction },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
}

export async function updateTransactionStatus(req: Request, res: Response) {
  try {
    const data = req.body;

    console.log(data);

    await prisma.transaction.update({
      where: { id: data.order_id },
      data: { status: "PAID" },
    });

    res.status(200).json({ message: "Status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update transaction status" });
  }
}
