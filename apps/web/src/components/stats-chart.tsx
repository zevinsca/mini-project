// // components/StatsChart.tsx
// "use client";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { date: "2025-01", value: 120 },
//   { date: "2025-02", value: 240 },
//   { date: "2025-03", value: 180 },
//   { date: "2025-04", value: 300 },
//   { date: "2025-05", value: 400 },
// ];

// export default function StatsChart() {
//   return (
//     <section className="bg-white p-4 rounded-xl shadow-md">
//       <p className="text-lg font-semibold mb-4">Monthly Revenue</p>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="value"
//             stroke="#3b82f6"
//             strokeWidth={2}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </section>
//   );
// }
