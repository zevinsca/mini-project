"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Event = {
  slug: string;
  name: string;
  shortDescription: string;
  eventDate: string;
  imagePreview: [{ imageUrl: string }];
};

export default function FilteredEventsSection({
  category,
}: {
  category?: string;
}) {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: "1",
          perPage: "6",
        });

        if (category) {
          queryParams.set("category", category);
        }

        const res = await fetch(
          `http://localhost:8000/api/v1/events?${queryParams}`
        );
        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return (
    <section className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">
        {category ? `Events in ${category}` : "All Events"}
      </h2>
      {isLoading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">
          {events.map((event) => {
            const date = new Date(event.eventDate);
            const datePart = date.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            });
            const timePart = date.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });
            const displayDate = `${datePart} • ${timePart}`;

            return (
              <article
                key={event.slug}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={event.imagePreview[0].imageUrl}
                    alt="Event Image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{event.name}</h3>
                  <p className="text-gray-500 text-sm">{displayDate}</p>
                  <p className="text-gray-700 py-2">{event.shortDescription}</p>
                  <Link
                    href={`/events/${event.slug}`}
                    className="text-orange-500 font-semibold"
                  >
                    See more
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
