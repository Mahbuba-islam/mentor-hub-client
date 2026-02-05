/* eslint-disable @typescript-eslint/no-explicit-any */
import TutorCard from "./tutorCard"

export default function FeaturedTutorList({ tutors }: { tutors: any }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor:any) => (
        <div key={tutor.id} className="relative">

          {/* Featured Badge */}
          {tutor.isFeatured && (
            <span className="absolute top-3 right-3 z-10 px-3 py-1 text-xs font-semibold 
              bg-gradient-to-r from-[#5624D0] to-[#b00ea5] text-white rounded-full shadow">
              Featured
            </span>
          )}

          {/* Same design as TutorsCard */}
          <TutorCard
            id={tutor.id}
            bio={tutor.bio}
            categoryName={tutor.category?.name}
            price={tutor.price}
            rating={tutor.rating}
            totalReviews={tutor.totalReviews}
            user={{
              name: tutor.user?.name ?? "Unknown",
              image: tutor.user?.image,
            }}
            onDetailsClick={(id) => {
              console.log("Clicked tutor:", id)
            }}
          />
        </div>
      ))}
    </div>
  )
}