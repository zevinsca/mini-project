"use client";
import { useEffect, useState } from "react";
import CategorySection from "@/components/category-section";

interface CurrentUser {
  id: string;
  firstName: string;
  username: string;
  email: string;
  role: string;
  referralCode: string;
  point: number;
}

export default function ParticipantPage() {
  const [userData, setUserData] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/user/current-user", {
      method: "GET",
      credentials: "include", // ✅ Important to include cookies
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen grid place-items-center">
        <p>Loading user info...</p>
      </main>
    );
  }

  if (!userData) {
    return (
      <main className="min-h-screen grid place-items-center">
        <p>Failed to load user info.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-500">
          Welcome, {userData.firstName}!
        </h1>

        <div className="text-center space-y-1 bg-white p-4 rounded-xl shadow-md border w-full max-w-xs">
          <p className="text-lg font-medium text-gray-700">
            Points: <span className="text-orange-500">{userData.point}</span>
          </p>
          <p className="text-sm text-gray-500">
            Referral Code:{" "}
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              {userData.referralCode}
            </span>
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-xl sm:text-base pt-7">
            Here are the events you can join 🎉
          </p>

          <CategorySection />
        </div>
      </div>
    </main>
  );
}
