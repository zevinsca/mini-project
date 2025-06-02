import express, { Request, Response, Application } from "express";
import { prisma } from "../configs/prisma-config.js";

import fs from "fs/promises";

import cloudinary from "../configs/cloudinary-config.js";

export async function getAllEvents(req: Request, res: Response) {
  try {
    // Read query params
    const {
      search = "",
      page = "1",
      perPage = "6",
      category = "all",
    } = req.query;

    // Parse and validate page and perPage
    const currentPage = parseInt(page as string, 10) || 1;
    const perPageInt = parseInt(perPage as string, 10) || 6;

    // Calculate offset
    const skip = (currentPage - 1) * perPageInt;

    // Split search query into keywords (space separated)
    const keywords = (search as string).split(/\s+/).filter(Boolean);

    // Build dynamic OR filter for search
    const searchConditions =
      keywords.length > 0
        ? {
            OR: keywords.flatMap((keyword) => [
              { name: { contains: keyword, mode: "insensitive" } },
              { shortDescription: { contains: keyword, mode: "insensitive" } },
              { description: { contains: keyword, mode: "insensitive" } },
              { location: { contains: keyword, mode: "insensitive" } },
            ]),
          }
        : {};

    // Build category filter (if any)
    const categoryCondition =
      category !== "all"
        ? {
            EventCategory: {
              some: {
                Category: {
                  name: { equals: category, mode: "insensitive" },
                },
              },
            },
          }
        : {};

    // Combine filters
    const combinedWhere = {
      AND: [searchConditions, categoryCondition],
    };

    // Count total events (filtered)
    const totalCount = await prisma.event.count({
      where: combinedWhere,
    });

    // Fetch paginated events
    const events = await prisma.event.findMany({
      where: combinedWhere,
      include: {
        EventCategory: { include: { Category: true } },
        User: true,
        imageContent: true,
        imagePreview: true,
      },
      skip,
      take: perPageInt,
      orderBy: {
        eventDate: "asc",
      },
    });

    const allResult = events.map((item) => ({
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
        (el: { Category: { name: string } }) => el.Category.name
      ),
    }));

    const totalPages = Math.ceil(totalCount / perPageInt);

    res.status(200).json({
      data: allResult,
      currentPage,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all events data" });
  }
}

export async function getEventBySlug(req: Request, res: Response) {
  try {
    const slug = req.params.slug;
    const event = await prisma.event.findUnique({
      where: { slug: slug },
      include: {
        EventCategory: { include: { Category: true } },
        User: true,
        imageContent: true,
        imagePreview: true,
      },
    });
    res.status(200).json({ data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get event by slug" });
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
      categories,
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
      !categories ||
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
          imagePreviewData.push({ imageUrl: result.secure_url });
        }

        if (key === "imageContent") {
          imageContentData.push({ imageUrl: result.secure_url });
        }
        await fs.unlink(el.path);
      }
    }

    let newCategories = categories;

    if (typeof newCategories == "string") {
      newCategories = [newCategories];
    }

    await prisma.event.create({
      data: {
        name,
        shortDescription,
        description,
        eventDate: new Date(eventDate),
        location,
        price: parseFloat(price),
        ticketTypes: parseFloat(price) > 0 ? "PAID" : "FREE",
        stock: parseInt(stock, 10),
        salesStart: new Date(salesStart),
        salesEnd: new Date(salesEnd),
        userId,
        imagePreview: { create: imagePreviewData },
        imageContent: { create: imageContentData },
        slug: name.toLowerCase().split(" ").join("-"),
        EventCategory: {
          create: newCategories.map((categoryId: string) => ({
            categoryId,
          })),
        },
      },
    });

    res.status(201).json({ message: "Created new event" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Cannot create new event" });
  }
}

export async function deleteEventById(req: Request, res: Response) {
  try {
    const eventId = req.params.eventId;
    const userId = req.user.id;
    const userRole = req.user.role;

    const eventData = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (eventData?.userId === userId || userRole === "EVENT_ORGANIZER") {
      await prisma.event.delete({ where: { id: eventId } });
      res.status(200).json({ message: "Event has been deleted!" });

      return;
    }

    res.status(403).json({ message: "unauthorized to delete this event" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete event" });
  }
}

export async function getEventByUserId(req: Request, res: Response) {
  try {
    const userId = req.user.id;

    const events = await prisma.event.findMany({
      where: { userId },
      include: {
        EventCategory: { include: { Category: true } },
        User: true,
        imageContent: true,
        imagePreview: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const allResult = events.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      shortDescription: item.shortDescription,
      description: item.description,
      eventDate: item.eventDate,
      location: item.location,
    }));

    res.status(200).json({ data: allResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get event by user ID" });
  }
}
