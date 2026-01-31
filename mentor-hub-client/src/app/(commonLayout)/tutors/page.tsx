import { tutorService } from "@/src/services/tutor.services";
import TutorCard from "@/components/modules/homepage/tutorCard";
import { TutorProfile } from "@/src/types/tutor.types";
import { Navbar } from "@/components/Navbar1";
import Footer from "@/components/ui/Footer";

export default async function TutorsPage({ searchParams }: any) {
  const categoryId = searchParams.category;

  const { data: tutors } = await tutorService.getTutors({
    category: categoryId,
  });

  return (
    <div>
      <Navbar />

      <section className="space-y-6 mt-6">
        <h2 className="text-xl font-bold">
          {categoryId ? "Tutors in this Category" : "All Tutors"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {tutors?.data?.map((tutor: TutorProfile) => (
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
                image: tutor.user?.image ?? "Unknown",
              }}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}