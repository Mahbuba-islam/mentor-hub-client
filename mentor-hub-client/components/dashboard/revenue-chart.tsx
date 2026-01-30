"use client"

import { Line } from "react-chartjs-2"

export default function RevenueChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Revenue",
        data: [1200, 2400, 1800, 3000],
        borderColor: "#7c3aed",
        tension: 0.4,
      },
    ],
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <Line data={data} />
    </div>
  )
}