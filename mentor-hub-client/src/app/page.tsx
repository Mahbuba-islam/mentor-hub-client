import { tutorService } from "@/src/services/tutor.services";

import TutorCard from "@/components/modules/homepage/tutorCard";
import { TutorProfile } from "../types/tutor.types";
import Link from "next/link";
import { Navbar } from "@/components/Navbar1";
import Footer from "@/components/ui/Footer";
import { getCategoriesAction } from "./actions/category.action";

export default async function HomePage() {
 const { data: categories } = await getCategoriesAction();

  console.log('cat....',categories);
  const { data: featuredTutors } = await tutorService.getFeaturedTutors();

  return (
    <div>
      <Navbar />

      {/* Categories Section */}
      <section className="space-y-6 mt-6">
        <h2 className="text-xl font-bold">Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories?.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/tutors?category=${cat.id}`}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="space-y-6 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Featured Tutors</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {featuredTutors?.data?.map((tutor: TutorProfile) => (
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

        <Link
          href="/tutors"
          className="text-sm text-blue-600 hover:underline"
        >
          Browse more →
        </Link>
      </section>

      <Footer />
    </div>
  );
}