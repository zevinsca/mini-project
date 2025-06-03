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

interface Transaction {
  id: string;
  event: {
    name: string;
  };
  ticketAmount: number;
  priceAmount: number;
  status: string;
}

export default function ParticipantPage() {
  const [userData, setUserData] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  // Function to fetch transactions (can be reused for refresh)
  const fetchTransactions = () => {
    setTransactionsLoading(true);
    fetch("http://localhost:8000/api/v1/transactions/my-transactions", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.data);
        setTransactionsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        setTransactionsLoading(false);
      });
  };

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

  useEffect(() => {
    // Use fetchTransactions function for initial load
    fetchTransactions();
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

        <div className="w-full max-w-md bg-white p-4 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Your Transactions
          </h2>

          {/* Refresh button added here */}
          <button
            onClick={fetchTransactions}
            className="mb-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Refresh Transactions
          </button>

          {transactionsLoading ? (
            <p>Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p>No transactions found.</p>
          ) : (
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="p-3 border rounded-lg shadow-sm text-left"
                >
                  <p className="font-medium text-gray-800">
                    Event:{" "}
                    <span className="text-orange-500">{tx.event.name}</span>
                  </p>
                  <p className="text-gray-600">Tickets: {tx.ticketAmount}</p>
                  <p>
                    Status:{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded ${
                        tx.status === "PAID"
                          ? "bg-green-100 text-green-600"
                          : tx.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
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
