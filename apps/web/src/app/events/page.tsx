"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Event {
  slug: string;
  name: string;
  shortDescription: string;
  eventDate: string;
  imagePreview: [{ imageUrl: string }];
}

export default function EventsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const EVENTS_PER_PAGE = 6;

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage.toString(),
          search: searchQuery,
          perPage: EVENTS_PER_PAGE.toString(),
        });

        const res = await fetch(
          `http://localhost:8000/api/v1/events?${queryParams}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch events");

        const data = await res.json();
        setEvents(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [currentPage, searchQuery]);

  const handlePrevPage = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", Math.max(currentPage - 1, 1).toString());
    router.push(`/events?${newParams.toString()}`);
  };

  const handleNextPage = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", Math.min(currentPage + 1, totalPages).toString());
    router.push(`/events?${newParams.toString()}`);
  };

  return (
    <section className="min-h-screen mx-auto container pt-36 pb-8 px-8">
      <h2 className="text-3xl font-bold">Events</h2>

      {/* Search Query Display */}
      {searchQuery && (
        <p className="mt-4 italic text-gray-600">
          Search results for "
          <span className="font-semibold">{searchQuery}</span>"
        </p>
      )}

      {/* Loading State */}
      {isLoading ? (
        <p className="text-center text-lg mt-8">Loading events...</p>
      ) : (
        <>
          {/* Events Grid */}
          <div className="grid lg:grid-cols-3 pt-10 gap-x-4 gap-y-8">
            {events.map((event: Event) => {
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
                  className="bg-white shadow-xl rounded-lg"
                >
                  <div className="relative h-72 w-full">
                    <Image
                      src={event.imagePreview[0].imageUrl}
                      alt="Event Image"
                      fill
                      className="object-cover rounded-t-2xl"
                    />
                  </div>
                  <div className="p-4 h-52">
                    <h2 className="text-black font-bold text-2xl">
                      {event.name}
                    </h2>
                    <p className="pt-3">{displayDate}</p>
                    <p className="italic text-gray-600 py-3">
                      {event.shortDescription}
                    </p>
                    <Link
                      href={`/events/${event.slug}`}
                      className="rounded-md bg-orange-400 px-3 py-2 text-white"
                    >
                      See more
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {events.length > 0 && (
            <div className="flex justify-center items-center mt-8 space-x-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-lg font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
