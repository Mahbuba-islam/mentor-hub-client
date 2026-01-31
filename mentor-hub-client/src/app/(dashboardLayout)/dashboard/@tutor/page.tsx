// import BookingTable from "@/components/dashboard/bookingTable";

// export default function TutorDashboard() {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Tutor Dashboard</h1>
//       <BookingTable type="tutor" />
//     </div>
//   )
// }

// const {data} = await userService.getSession()
//     console.log("dashboard layout", data);
//     const user = data.user


import { tutorService } from "@/src/services/tutor.services"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default async function TutorDashboardHome() {
  const { data } = await (tutorService.getTutors())
console.log('tutor dashboard',data);
  // const {   reviews, rating, totalReviews } = data

  return (
    <div className="space-y-6">
      
      <h1 className="text-3xl font-bold">Tutor Dashboard</h1>

      {/* Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p>Total Sessions</p><h2 className="text-2xl font-bold">{pastSessions.length + upcomingSessions.length}</h2></CardContent></Card>
        <Card><CardContent className="p-4"><p>Upcoming</p><h2 className="text-2xl font-bold">{upcomingSessions.length}</h2></CardContent></Card>
        <Card><CardContent className="p-4"><p>Rating</p><h2 className="text-2xl font-bold">{rating}</h2></CardContent></Card>
        <Card><CardContent className="p-4"><p>Total Reviews</p><h2 className="text-2xl font-bold">{totalReviews}</h2></CardContent></Card>
      </div> */}

      {/* Today's Sessions */}
      {/* <Card>
        <CardHeader><CardTitle>Today Sessions</CardTitle></CardHeader>
        <CardContent>
          {upcomingSessions.length === 0 && <p>No sessions today</p>}
          {upcomingSessions.map((s: any) => (
            <div key={s.id} className="border p-3 rounded mb-2">
              <p className="font-medium">{s.student.name}</p>
              <p>{new Date(s.date).toLocaleString()}</p>
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* Recent Reviews */}
      {/* <Card>
        <CardHeader><CardTitle>Recent Reviews</CardTitle></CardHeader>
        <CardContent>
          {reviews.slice(0, 3).map((r: any) => (
            <div key={r.id} className="border p-3 rounded mb-2">
              <p className="font-medium">{r.student.name}</p>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </CardContent>
      </Card> */}

    </div>
  )
}