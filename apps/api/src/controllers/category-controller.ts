import express, { Request, Response, Application } from "express";
import { prisma } from "../configs/prisma-config.js";

import fs from "fs/promises";

import cloudinary from "../configs/cloudinary-config.js";

export async function getAllCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        EventCategory: {
          include: {
            Event: true,
          },
        },
      },
    });

    const result = categories.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        events: item.EventCategory.map((el) => {
          return {
            id: el.Event.id,
            name: el.Event.name,
            slug: el.Event.slug,
            eventDate: el.Event.eventDate,
          };
        }),
      };
    });

    res.status(200).json({ data: result, rawData: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all categories" });
  }
}

export async function getCategoryByName(req: Request, res: Response) {
  try {
    const name = req.params.name;
    const category = await prisma.category.findUnique({
      where: { name },
      include: {
        EventCategory: {
          include: {
            Event: true,
          },
        },
      },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const result = {
      id: category.id,
      name: category.name,
      image: category.image,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
      events: category.EventCategory.map((el) => {
        return {
          id: el.Event.id,
          name: el.Event.name,
          slug: el.Event.slug,
          eventDate: el.Event.eventDate,
        };
      }),
    };

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get category by name" });
  }
}
