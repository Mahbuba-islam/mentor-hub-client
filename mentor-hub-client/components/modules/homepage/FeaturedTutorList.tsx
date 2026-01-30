import TutorCard from "@/components/modules/homepage/tutorCard"

export default function FeaturedTutorList({ tutors }: { tutors: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tutors.map((tutor) => (
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
            image: tutor.user?.image,
          }}
          onDetailsClick={(id) => {
            console.log("Clicked tutor:", id)
          }}
        />
      ))}
    </div>
  )
}