import BookingTable from "@/components/dashboard/bookingTable";

export default function TutorDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
      <BookingTable type="tutor" />
    </div>
  )
}
