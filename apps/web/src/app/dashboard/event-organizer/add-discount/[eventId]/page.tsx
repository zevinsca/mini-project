"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AddDiscountPage() {
  const { eventId } = useParams();
  const router = useRouter();

  const [amount, setAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/v1/discounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for auth
        body: JSON.stringify({
          eventId,
          amount: parseInt(String(amount), 10),
          startDate,
          endDate,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create discount");
      }

      // Redirect back to the dashboard or show success message
      router.push("/dashboard");
    } catch (err) {
      console.error("Error creating discount:", err);
      setError("Failed to create discount. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-4 pt-28 lg:pt-35 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Discount for Event</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-md space-y-4"
      >
        <div>
          <label htmlFor="amount" className="block mb-1 font-medium">
            Discount Amount (%)
          </label>
          <input
            id="amount"
            type="number"
            min={1}
            className="border rounded px-3 py-2 w-full"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="startDate" className="block mb-1 font-medium">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate" className="block mb-1 font-medium">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Discount"}
        </button>
      </form>
    </main>
  );
}
