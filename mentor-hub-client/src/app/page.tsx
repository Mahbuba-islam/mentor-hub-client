import { tutorService } from "@/src/services/tutor.services"

import TutorCard from "@/components/modules/homepage/tutorCard"
import { TutorProfile } from "../types/tutor.types"
import Link from "next/link"
import { Navbar } from "@/components/Navbar1"
import Footer from "@/components/ui/Footer"

export default async function HomePage() {
  const { data: featuredTutors } = await tutorService.getFeaturedTutors()

  return (
    <div>
      <Navbar></Navbar>
    <section className="space-y-6">

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
              image: tutor.user?.image ?? "Unknown"
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
    <Footer></Footer>
    </div>
  )
}