"use client";

import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  price: number;
  seat: number;
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
        const id = (await params).id;

        const res = await fetch(`http://localhost:8000/api/v1/events/${id}`);
        const data = await res.json();

        setEvent(data);
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
    <main className="min-h-screen grid place-items-center">
      {/* MIDTRANS Pop Up */}
      <div id="snap-container" className="fixed"></div>

      <div className="w-full max-w-80 flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold text-center">{event?.title}</h2>
        <div className="flex flex-col items-center">
          <p className="font-bold text-xl">Price</p>
          <p>Rp. {event?.price}</p>
        </div>

        <div className="flex flex-col items-center">
          <p className="font-bold text-xl">Seat</p>
          <p>{event?.seat}</p>
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="p-4 border"
              onClick={() =>
                setTotalTicket((prev) => {
                  return Math.max(prev - 1, 0);
                })
              }
            >
              -
            </button>
            <span>{totalTicket}</span>
            <button
              type="button"
              className="p-4 border"
              onClick={() =>
                setTotalTicket((prev) => {
                  return Math.min(prev + 1, event!.seat);
                })
              }
            >
              +
            </button>
          </div>

          <button type="submit" className="border p-2 w-full mt-2">
            Pay
          </button>
        </form>
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
