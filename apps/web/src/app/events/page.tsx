import Link from "next/link";
import Image from "next/image";
interface Event {
  slug: string;
  name: string;
  eventDate: string;
  imagePreview: [{ imageUrl: string }];
}

export default async function EventsPage() {
  const res = await fetch("http://localhost:8000/api/v1/events");
  const data = await res.json();

  return (
    <section className="min-h-screen mx-auto container pt-36 pb-8 px-8">
      <h2 className="text-3xl font-bold">Events</h2>
      <div className="grid lg:grid-cols-3 pt-10 gap-4">
        {data.data.map((event: Event) => {
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
            <article key={event.slug} className="bg-white shadow-xl rounded-lg">
              <div className="relative h-56 w-full">
                <Image
                  src={event.imagePreview[0].imageUrl}
                  alt="Event Image"
                  fill
                  className="object-cover rounded-t-2xl"
                />
              </div>
              <div className="p-4">
                <h2 className="text-black">{event.name}</h2>
                <p>{displayDate}</p>
                <Link href={`/events/${event.slug}`}>See more</Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
