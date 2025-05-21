import express, { Request, Response, Application } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";

const prisma = new PrismaClient();
export async function getAllEvents(req: Request, res: Response) {
  try {
    const id = req.params.articleId;
    const article = await prisma.article.findMany({
      include: { EventCategory },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all articles" });
  }
}
{
}
