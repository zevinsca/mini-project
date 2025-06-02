// components/DateRangePicker.tsx
"use client";

import { useState } from "react";

export default function DateRangePicker() {
  const [range, setRange] = useState("monthly");

  return (
    <section className="mb-4">
      <label className="mr-2 font-semibold">Report Range:</label>
      <select
        value={range}
        onChange={(e) => setRange(e.target.value)}
        className="border px-2 py-1 rounded"
      >
        <option value="daily">Per Day</option>
        <option value="monthly">Per Month</option>
        <option value="yearly">Per Year</option>
      </select>
    </section>
  );
}
