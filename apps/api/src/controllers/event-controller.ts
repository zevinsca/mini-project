import express, { Request, Response, Application } from "express";
import { prisma } from "../configs/prisma-config.js";

import fs from "fs/promises";

import cloudinary from "../configs/cloudinary-config.js";

export async function getAllEvents(req: Request, res: Response) {
  try {
    const events = await prisma.event.findMany({
      include: {
        EventCategory: { include: { Category: true } },
        User: true,
        imageContent: true,
        imagePreview: true,
      },
    });

    const allResult = events.map((item) => {
      return {
        id: item.id,
        name: item.name,
        slug: item.slug,
        shortDescription: item.shortDescription,
        description: item.description,
        eventDate: item.eventDate,
        location: item.location,
        price: item.price,
        stock: item.stock,
        imagePreview: item.imagePreview,
        TicketType: item.ticketTypes,
        salesStart: item.salesStart,
        salesEnd: item.salesEnd,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        organizer: `${item.User.firstName} ${item.User.lastName}`,
        category: item.EventCategory.map(
          (el: { Category: { name: string } }) => {
            return el.Category.name;
          }
        ),
      };
    });

    res.status(200).json({ data: allResult, rawData: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all events data" });
  }
}

export async function getEventById(req: Request, res: Response) {
  try {
    const id = req.params.eventId;
    const event = await prisma.event.findUnique({ where: { id: id } });
    res.status(200).json({ data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get article by id" });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const {
      name,
      shortDescription,
      description,
      eventDate,
      location,
      price,
      stock,
      salesStart,
      salesEnd,
    } = req.body;
    const files = req.files as {
      [key: string]: Express.Multer.File[];
    };
    const userId = req.user.id;

    if (
      !name ||
      !shortDescription ||
      !description ||
      !eventDate ||
      !location ||
      !price ||
      !stock ||
      !salesStart ||
      !salesEnd ||
      !files ||
      !userId
    ) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const imagePreviewData: { url: string }[] = [];
    const imageContentData: { url: string }[] = [];

    for (const key in files) {
      for (const el of files[key]) {
        const result = await cloudinary.uploader.upload(el.path, {
          folder: "mini-project",
        });

        if (key === "imagePreview") {
          imagePreviewData.push({ url: result.secure_url });
        }

        if (key === "imageContent") {
          imageContentData.push({ url: result.secure_url });
        }
        await fs.unlink(el.path);
      }
    }

    await prisma.event.create({
      data: {
        name,
        shortDescription,
        description,
        eventDate: new Date(eventDate),
        location,
        price: parseFloat(price),
        stock: parseInt(stock, 10),
        salesStart: new Date(salesStart),
        salesEnd: new Date(salesEnd),
        userId,
        ImagePreview: { create: imagePreviewData },
        ImageContent: { create: imageContentData },
        slug: name.toLowerCase().split(" ").join("-"),
      },
    });

    res.status(201).json({ message: "Created new article" });
  } catch (error) {
    console.error(error);
    console.error(error);
    res.status(500).json({ message: "Cannot create new article" });
  }
}
