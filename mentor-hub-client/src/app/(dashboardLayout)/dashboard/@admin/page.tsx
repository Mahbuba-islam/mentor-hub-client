
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

     

      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/users">
          <Button variant="outline" className="w-full justify-start">
            Manage Users
          </Button>
        </Link>
        <Link href="/dashboard/bookings">
          <Button variant="outline" className="w-full justify-start">
            View Bookings
          </Button>
        </Link>
        <Link href="/dashboard/categories">
          <Button variant="outline" className="w-full justify-start">
            Manage Categories
          </Button>
        </Link>
      </div>
    </div>
  )
}




