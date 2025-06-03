// app/page.tsx
import OverviewCards from "@/components/overview-card";
import DateRangePicker from "@/components/date-range";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="px-4 pt-28 lg:pt-35">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <OverviewCards />
      <DateRangePicker />

      <Link
        href="/dashboard/event-organizer/create-event"
        className="flex flex-col items-center text-black hover:text-gray-600"
      >
        <span className="text-5xl font-light text-[#FFA500]">+</span>
        <span className="text-xl font-medium">Create an event</span>
      </Link>
    </main>
  );
}
