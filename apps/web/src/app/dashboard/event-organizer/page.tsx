"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import OverviewCards from "@/components/overview-card";
import DateRangePicker from "@/components/date-range";

type Event = {
  id: string;
  name: string;
  eventDate: string;
  location: string;
  // Add more fields if needed
};

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/events/my-events",
        {
          credentials: "include", // send cookies to backend for auth
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      setEvents(data.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/events/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete event");
      }
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <main className="px-4 pt-28 lg:pt-35">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <OverviewCards />
      <DateRangePicker />

      <Link
        href="/dashboard/event-organizer/create-event"
        className="flex flex-col items-center text-black hover:text-gray-600 mb-6"
      >
        <span className="text-5xl font-light text-[#FFA500]">+</span>
        <span className="text-xl font-medium">Create an event</span>
      </Link>

      {/* Event Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Discount Code</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t">
                <td className="py-2 px-4">{event.name}</td>
                <td className="py-2 px-4">
                  {new Date(event.eventDate).toLocaleDateString("en-US")}
                </td>
                <td className="py-2 px-4">{event.location}</td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border rounded px-2 py-1 w-full"
                  />
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
