"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { z } from "zod";

// ✅ Schema Validasi Zod

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot be more than 30 characters"),
  lastName: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name cannot be more than 30 characters"),
  email: z.string().email("Invalid email address"),
  username: z
    .string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot be more than 20 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[a-z]/, "Password must contain one lowercase letter")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[0-9]/, "Password must contain one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain one symbol"),
  phone: z.string().max(15, "invalid phone number"),
  referralCode: z.string().optional(),
  role: z.enum(["EVENT_ORGANIZER", "PARTICIPANT"]),
});

export default function RegisterPage() {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    referralCode: "",
    role: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = registerSchema.safeParse(registerData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!res.ok) throw new Error("Failed to register user");

      setRegisterData({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        username: "",
        password: "",
        referralCode: "",
        role: "",
      });

      alert("New user created!");
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="relative min-h-screen w-full">
        <Image
          src="/concert3.png"
          alt="concert image"
          fill
          className="object-cover z-0"
        />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-xl">
          <h1 className="text-2xl font-bold text-center mb-5 text-[#ff5900]">
            Register
          </h1>
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="flex gap-7">
              <div className="grid">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="border border-black"
                  type="text"
                  id="firstName"
                  value={registerData.firstName}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      firstName: e.target.value,
                    })
                  }
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="grid">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="border border-black"
                  type="text"
                  id="lastName"
                  value={registerData.lastName}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      lastName: e.target.value,
                    })
                  }
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid">
              <label htmlFor="email">Email</label>
              <input
                className="border border-black"
                type="email"
                id="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="grid">
              <label htmlFor="username">Username</label>
              <input
                className="border border-black"
                type="text"
                id="username"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username}</p>
              )}
            </div>

            <div className="grid">
              <label htmlFor="phone">Phone</label>
              <input
                className="border border-black"
                type="text"
                id="phone"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div className="grid">
              <label htmlFor="password">Password</label>
              <input
                className="border border-black"
                type="password"
                id="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="grid">
              <label htmlFor="referralCode">Referral Code</label>
              <input
                className="border border-black"
                type="text"
                id="referralCode"
                value={registerData.referralCode}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    referralCode: e.target.value,
                  })
                }
              />
              {errors.referralCode && (
                <p className="text-red-500 text-sm">{errors.referralCode}</p>
              )}
            </div>

            <div className="grid">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                className="border border-black"
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData({ ...registerData, role: e.target.value })
                }
              >
                <option value="">Select Role</option>
                <option value="PARTICIPANT">Participant</option>
                <option value="EVENT_ORGANIZER">Event Organizer</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-sm">{errors.role}</p>
              )}
            </div>

            <button className="bg-[#ff5900] text-white mt-4 p-2" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
