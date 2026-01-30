import RevenueChart from "@/components/dashboard/revenue-chart";
import StatsCards from "@/components/dashboard/stats-cards";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <RevenueChart />
    </div>
  )
}
