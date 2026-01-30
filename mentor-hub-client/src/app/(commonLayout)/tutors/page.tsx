import { tutorService } from "@/src/services/tutor.services"
import TutorCard from "@/components/modules/homepage/tutorCard"
import { TutorProfile } from "@/src/types/tutor.types"

export default async function Tutors() {
  const response = await tutorService.getTutors()

  // Safely extract tutors no matter how backend returns it
  const tutors =
    response?.data?.tutors ??
    response?.data ??
    
    []

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">All Tutors</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tutors.map((tutor: TutorProfile) => (
          <TutorCard
            key={tutor.id}
            id={tutor.id}
            bio={tutor.bio}
            categoryName={tutor.category?.name}
            price={tutor.price}
            rating={tutor.rating}
            totalReviews={tutor.totalReviews}
            user={{
              name: tutor.user?.name ?? "Unknown",
              image: tutor.user?.image ?? "Unknown"
            }}
          />
        ))}
      </div>
    </section>
  )
}