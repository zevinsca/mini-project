"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!res.ok) {
        throw new Error("Failed fetch");
      }

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
    <main className="min-h-screen grid place-items-center ">
      <div className="relative min-h-screen w-full ">
        <Image
          src="/concert3.png"
          alt="concert image"
          fill
          className="object-cover z-0"
        ></Image>
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
                    setRegisterData((prev) => {
                      return { ...prev, firstName: e.target.value };
                    })
                  }
                />
              </div>
              <div className="grid">
                <label htmlFor="lastName">Last Name</label>
                <input
                  className="border border-black"
                  type="text"
                  id="lastName"
                  value={registerData.lastName}
                  onChange={(e) =>
                    setRegisterData((prev) => {
                      return { ...prev, lastName: e.target.value };
                    })
                  }
                />
              </div>{" "}
            </div>
            <div className="grid">
              <label htmlFor="email">Email</label>
              <input
                className="border border-black"
                type="email"
                id="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />
            </div>

            <div className="grid">
              <label htmlFor="username">Username</label>
              <input
                className="border border-black"
                type="text"
                id="username"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return { ...prev, username: e.target.value };
                  })
                }
              />
            </div>

            <div className="grid">
              <label htmlFor="phone">Phone</label>
              <input
                className="border border-black"
                type="text"
                id="phone"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return { ...prev, phone: e.target.value };
                  })
                }
              />
            </div>

            <div className="grid">
              <label htmlFor="password">Password</label>
              <input
                className="border border-black"
                type="password"
                id="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return { ...prev, password: e.target.value };
                  })
                }
              />
            </div>

            <div className="grid">
              <label htmlFor="referralCode">Referral Code</label>
              <input
                className="border border-black"
                type="text"
                id="referralCode"
                value={registerData.referralCode}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return { ...prev, referralCode: e.target.value };
                  })
                }
              />
            </div>

            <div className="grid">
              <label htmlFor="role">Role</label>
              <input
                className="border border-black"
                type="text"
                id="role"
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return { ...prev, role: e.target.value };
                  })
                }
              />
            </div>

            <button className="bg-[#ff5900] text-white" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
