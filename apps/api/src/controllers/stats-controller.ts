import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import { parseISO } from "date-fns";

const prisma = new PrismaClient();
export const getEventStats = async (req: Request, res: Response) => {
  try {
    const { start, end, groupBy = "month", organizerId } = req.query;

    if (!start || !end || !organizerId) {
      return res
        .status(400)
        .json({ error: "Missing start, end, or organizerId" });
    }

    const startDate = parseISO(start as string);
    const endDate = parseISO(end as string);

    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        Event: {
          userId: organizerId as string,
        },
        status: "PAID",
      },
      include: {
        Event: true,
      },
    });

    const statsMap: Record<string, { revenue: number; ticketsSold: number }> =
      {};

    transactions.forEach((tx) => {
      const date = new Date(tx.createdAt);
      let label = "";

      if (groupBy === "day") label = date.toISOString().split("T")[0];
      else if (groupBy === "month")
        label = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      else if (groupBy === "year") label = `${date.getFullYear()}`;

      if (!statsMap[label]) statsMap[label] = { revenue: 0, ticketsSold: 0 };

      statsMap[label].revenue += tx.priceAmount;
      statsMap[label].ticketsSold += tx.ticketAmount;
    });

    const formatted = Object.entries(statsMap).map(([label, value]) => ({
      label,
      ...value,
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
