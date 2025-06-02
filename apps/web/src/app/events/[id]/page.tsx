"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Event {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  eventDate: string;
  location: string;
  price: number;
  stock: number;
  ticketTypes: string;
  salesStart: string;
  salesEnd: string;
  imagePreview: { imageUrl: string }[];
  imageContent: { imageUrl: string }[];
  EventCategory: { Category: { name: string } }[];
}

export default function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [event, setEvent] = useState<Event | null>(null);
  const [totalTicket, setTotalTicket] = useState(0);

  useEffect(() => {
    async function getEvent() {
      try {
        const slug = (await params).id;

        const res = await fetch(`http://localhost:8000/api/v1/events/${slug}`, {
          credentials: "include",
        });
        const data = await res.json();

        setEvent(data?.data);
      } catch (error) {
        console.error(error);
      }
    }

    getEvent();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: event?.id,
        totalTicket: totalTicket,
      }),
      credentials: "include",
    });

    const data = await res.json();

    console.log(data);
  }

  return (
    <main className="pt-24 pb-10">
      <div id="snap-container" className="fixed"></div>

      <div className="w-full flex flex-col gap-4">
        {event && (
          <>
            {event.imagePreview && event.imagePreview.length > 0 && (
              <div className="w-full relative h-96">
                <Image
                  src={event.imagePreview[0].imageUrl}
                  alt={event.name}
                  fill
                  className="w-full object-cover"
                />
              </div>
            )}
            <div className="mx-auto container grid lg:grid-cols-2 gap-10">
              {event.imageContent && event.imageContent.length > 0 && (
                <div className="w-full relative h-96">
                  <Image
                    src={event.imageContent[0].imageUrl}
                    alt={event.name}
                    fill
                    className="w-full object-cover"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-center">{event.name}</h2>

                {/* Short Description */}
                <p className="text-center text-gray-600 italic">
                  {event.shortDescription}
                </p>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-xl mb-1  pt-5">
                    Description
                  </h3>
                  <p>{event.description}</p>
                  <p className="italic text-lg mb-1 pt-5">Tags :</p>
                  <div className="flex gap-2 flex-wrap">
                    {event?.EventCategory.length > 0
                      ? event.EventCategory.map((category) => (
                          <span
                            key={category.Category.name}
                            className="bg-gray-200 px-2 py-1 rounded-full text-sm"
                          >
                            {category.Category.name}
                          </span>
                        ))
                      : "No categories available"}
                  </div>
                </div>

                {/* Event Details */}
                <div className="flex flex-col pt-5">
                  <div>
                    <p className="font-semibold">Date:</p>
                    <p>{new Date(event.eventDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Location:</p>
                    <p>{event.location}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-5">
                    <div className="">
                      <p className="font-semibold">Sales Start:</p>
                      <p>{new Date(event.salesStart).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Sales End:</p>
                      <p>{new Date(event.salesEnd).toLocaleString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold pt-5">Stock:</p>
                    <p>{event.stock}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex flex-col items-center">
                  <p className="font-bold text-xl">Price</p>
                  <p>Rp. {event.price}</p>
                </div>

                {/* Ticket Purchase */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      type="button"
                      className="p-4 border"
                      onClick={() =>
                        setTotalTicket((prev) => Math.max(prev - 1, 0))
                      }
                    >
                      -
                    </button>
                    <span className="text-lg">{totalTicket}</span>
                    <button
                      type="button"
                      className="p-4 border"
                      onClick={() =>
                        setTotalTicket((prev) =>
                          Math.min(prev + 1, event.stock)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="border p-2 w-full bg-blue-500 text-white rounded"
                  >
                    Pay
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

/* ---------------------------------- NOTES --------------------------------- */
// useEffect(() => {
//   const myMidtransClientKey =
//     process.env.NEXT_PUBLIC_MIDTRANS_SANDBOX_CLIENT_KEY;
//   const script = document.createElement("script");
//   script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
//   script.setAttribute("data-client-key", myMidtransClientKey);

//   document.body.appendChild(script);
// }, []);

{
  /* <script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="....."></script>; */
}
