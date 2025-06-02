import CategorySection from "@/components/category-section";

export default function ParticpantPage() {
  return (
    <main className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-orange-500">
          Welcome, Participant!
        </h1>
        <p className="text-gray-600 text-xl sm:text-base">
          Here are the events you can join 🎉
        </p>
        <CategorySection />
      </div>
    </main>
  );
}
