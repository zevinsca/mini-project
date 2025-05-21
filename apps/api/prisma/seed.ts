import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.user.deleteMany();

    console.info("Delete success");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("newpass", salt);

    const user1 = await prisma.user.create({
      data: {
        firstName: "Andi",
        lastName: "Pratama",
        username: "andiprtm",
        email: "andi.pratama@mail.com",
        password: hashedPassword,
        phone: "081234567890",
        role: "PARTICIPANT",
        referralCode: "REFANDI01",
      },
    });

    const user2 = await prisma.user.create({
      data: {
        firstName: "Siti",
        lastName: "Aminah",
        username: "sitiamnh",
        email: "siti.aminah@mail.com",
        password: hashedPassword,
        phone: "082112345678",
        role: "PARTICIPANT",
        referralCode: "REFSITI02",
      },
    });

    const user3 = await prisma.user.create({
      data: {
        firstName: "Budi",
        lastName: "Santoso",
        username: "budiSa",
        email: "budi.santoso@mail.com",
        password: hashedPassword,
        phone: "085276543210",
        role: "PARTICIPANT",
        referralCode: "REFBUDI03",
      },
    });

    const user4 = await prisma.user.create({
      data: {
        firstName: "Dewi",
        lastName: "Lestari",
        username: "dewilstr",
        email: "dewi.lestari@mail.com",
        password: hashedPassword,
        phone: "089612345678",
        role: "PARTICIPANT",
        referralCode: "REFDEWI04",
      },
    });

    console.info("Seed finished");
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
}

seed();
