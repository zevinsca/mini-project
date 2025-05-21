import { Request, Response } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { registerSchema } from "../validations/auth-validation.js";

const prisma = new PrismaClient();

function generateReferralCode(firstName: string): string {
  const namePart = firstName.slice(0, 4).toUpperCase();
  const randomPart = Math.floor(100 + Math.random() * 900);
  return `${namePart}${randomPart}`;
}

export async function register(req: Request, res: Response) {
  try {
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      phone,
      referralCode: usedReferralCode,
    } = registerSchema.parse(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate unique referral code
    let referralCode: string | undefined;
    let isUnique = false;

    while (!isUnique) {
      const code = generateReferralCode(firstName);
      const existing = await prisma.user.findUnique({
        where: { referralCode: code },
      });

      if (!existing) {
        referralCode = code;
        isUnique = true;
      }
    }
    if (!referralCode) {
      throw new Error("Referral code was not generated");
    }
    // Create user
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        phone,
        referralCode,
      },
    });

    // Handle referral points (optional)
    if (usedReferralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: usedReferralCode },
      });

      if (referrer) {
        const pointAmount = 10000; // reward amount
        const expiredAt = new Date();
        expiredAt.setDate(expiredAt.getDate() + 90); // expires in 90 days

        await prisma.point.create({
          data: {
            userId: referrer.id,
            amount: pointAmount,
            expiredAt,
          },
        });
      }
    }

    res.status(201).json({ message: "Registration success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to register new user", error });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { username, password, email } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username: username }, { email: email }] },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const JWTToken = jwt.sign(
      {
        id: existingUser.id,
        firstName: existingUser.firstName,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
      },
      "superdupersecret"
    );

    res
      .cookie("accessToken", JWTToken, {})
      .status(200)
      .json({ message: "Login success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
}

export async function logout(_req: Request, res: Response) {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "Logout success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to logout" });
  }
}
