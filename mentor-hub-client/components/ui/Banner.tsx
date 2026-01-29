import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section className="w-full border-b bg-[#F7F9FA]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 md:flex-row md:py-20">
        
        {/* Left: Text */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5624D0]">
            Learn • Mentor • Grow
          </p>
          <h1 className="text-3xl font-bold leading-tight text-[#1C1D1F] md:text-4xl lg:text-5xl">
            Find the right mentor to level up your learning.
          </h1>
          <p className="text-sm text-[#6A6F73] md:text-base max-w-xl">
            MentorHub connects students with experienced tutors for 1:1 sessions, structured learning paths, and real-world guidance.
          </p>

          <div className="flex flex-col items-center gap-3 pt-2 md:flex-row md:items-center">
            <Button asChild size="lg" className="w-full md:w-auto bg-[#5624D0] hover:bg-[#4a1fb8]">
              <Link href="/tutors">Find a Tutor</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full md:w-auto">
              <Link href="/become-tutor">Become a Tutor</Link>
            </Button>
          </div>

          <p className="text-xs text-[#6A6F73] pt-1">
            Trusted by students and mentors worldwide.
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <div className="relative mx-auto h-64 w-full max-w-md md:h-80">
            <Image
              src="/images/mentorhub-hero.png" 
              alt="Student and mentor learning together"
              fill
              className="rounded-xl object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}