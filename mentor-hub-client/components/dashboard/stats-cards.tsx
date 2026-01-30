export default function StatsCards() {
  const stats = [
    { label: "Total Users", value: "1,240" },
    { label: "Total Tutors", value: "320" },
    { label: "Total Bookings", value: "4,560" },
    { label: "Revenue", value: "$12,400" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="p-4 bg-white shadow rounded">
          <p className="text-sm text-gray-500">{s.label}</p>
          <p className="text-xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  )
}