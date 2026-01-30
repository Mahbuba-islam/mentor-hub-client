import BookingTable from "@/components/dashboard/bookingTable";

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>
      <BookingTable type="student" />
    </div>
  )
}
