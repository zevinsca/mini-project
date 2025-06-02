// components/OverviewCards.tsx
export default function OverviewCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h4 className="text-gray-500">Total Events</h4>
        <p className="text-2xl font-bold">12</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h4 className="text-gray-500">Registrations</h4>
        <p className="text-2xl font-bold">340</p>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-md">
        <h4 className="text-gray-500">Revenue</h4>
        <p className="text-2xl font-bold">$5,230</p>
      </div>
    </section>
  );
}
