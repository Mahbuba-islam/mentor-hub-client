import { tutorService } from "@/src/services/tutor.services";
import { TutorProfile } from "../types/tutor.types";
import Link from "next/link";
import { Navbar } from "@/components/Navbar1";
import Footer from "@/components/ui/Footer";
import { getCategoriesAction } from "./actions/category.action";
import TutorCard from "@/components/modules/homepage/tutorCard";
import BannerCarousel from "@/components/modules/homepage/HeroBanner";
import HeroBanner from "@/components/ui/Banner";

export default async function HomePage() {
  const { data: categories } = await getCategoriesAction();
  const { data: featuredTutors } = await tutorService.getFeaturedTutors();

  return (
    <div>
      <Navbar />
    <HeroBanner/>
      {/* Categories Section */}
      <section className="space-y-8 mt-10 px-4 md:px-10 animate-fadeIn text-center">
        <h2 className="text-3xl font-extrabold 
        bg-gradient-to-r from-[#5d40a1] to-[#b00ea5] bg-clip-text text-transparent animate-gradientShift">
          Explore Categories
        </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
  {categories?.map((cat: any) => (
    <Link
      key={cat.id}
      href={`/tutors?category=${cat.id}`}
      className="
        px-3 py-2 
        rounded-lg 
        text-center 
        text-sm font-semibold 
        bg-gradient-to-br from-[#f3e8ff] to-[#ffe6fa] 
        text-[#5624D0]
        shadow-sm 
        border border-[#e8d7ff]
        hover:shadow-md 
        hover:-translate-y-1 
        transition-all duration-300
      "
    >
      {cat.name}
    </Link>
  ))}
</div>

      </section>

      {/* Featured Tutors */}
     <section className="space-y-8 mt-14 px-4 md:px-10 animate-fadeIn">
  <h2 className="text-3xl font-extrabold text-center 
    bg-gradient-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent 
    animate-gradientShift">
    Discover Expert Tutors
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {featuredTutors?.data?.map((tutor: TutorProfile) => (
      <div key={tutor.id} className="relative">

        {/* Smaller Featured Badge */}
        {tutor.isFeatured && (
          <span className="absolute top-2 right-2 z-20 px-2 py-0.5 text-[10px] font-semibold 
            bg-gradient-to-r from-[#5624D0] to-[#b00ea5] text-white rounded-full shadow">
            Featured
          </span>
        )}

        <TutorCard
          id={tutor.id}
          bio={tutor.bio}
          categoryName={tutor.category?.name}
          price={tutor.price}
          rating={tutor.rating}
          totalReviews={tutor.totalReviews}
          subject={tutor.subject}
          user={{
            name: tutor.user?.name ?? "Unknown",
            image: tutor.user?.image ?? "Unknown",
          }}
        />
      </div>
    ))}
  </div>

  <Link
  href="/tutors"
  className="mx-auto flex items-center gap-2 text-sm font-semibold 
    bg-gradient-to-r from-[#5624D0] to-[#b00ea5] bg-clip-text text-transparent
    hover:opacity-80 transition-all duration-300"
>
  Browse more
  <span className="text-[#5624D0] text-base transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
</Link>



</section>

      <Footer />
    </div>
  );
}