"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const slides = [
  {
    image: "https://i.ibb.co/7dNBB3ZH/mentor-Hub-banner-6.jpg",
    title: "Master tomorrow’s skills today",
    subtitle: "Learn smarter with expert-led lessons designed for real-world success.",
    primaryCta: { label: "Get Started", href: "/signup" },
    secondaryCta: { label: "Browse Tutors", href: "/tutors" },
  },
  {
    image: "https://i.ibb.co/fVgftxQr/mentor-hub-banner-2.jpg",
    title: "Unlock your potential with modern learning",
    subtitle: "Grow your skills with expert mentors and personalized guidance.",
    primaryCta: { label: "Explore Categories", href: "/categories" },
    secondaryCta: { label: "View Plans", href: "/pricing" },
  },
  {
    image: "https://i.ibb.co/GQ2Xm0KK/mentor-Hub-banner-3.jpg",
    title: "Future-ready skills for a future-ready you",
    subtitle: "Master AI, tech, and career skills with curated learning paths.",
    primaryCta: { label: "Learn AI", href: "/ai" },
    secondaryCta: { label: "See All Courses", href: "/courses" },
  },
];

export function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const id = setInterval(next, 7000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[current];

  return (
    <section className="w-full mt-6">
      <div className="relative w-full h-[260px] md:h-[360px] lg:h-[420px] overflow-hidden rounded-2xl bg-gradient-to-r from-[#5624D0] to-[#eac1e8] flex">

        {/* LEFT SIDE TEXT */}
        <div className="w-1/2 flex items-center px-6 md:px-12 lg:px-16 text-white">
          <div className="max-w-lg space-y-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              {slide.title}
            </h1>
            <p className="text-sm md:text-lg text-white/90">    

    {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-3 mt-3">
              <Link
                href={slide.primaryCta.href}
                className="px-5 py-2.5 rounded-full text-sm md:text-base font-semibold
                  bg-white text-[#5624D0] shadow hover:shadow-md hover:-translate-y-[1px]
                  transition-all duration-200"
              >
                {slide.primaryCta.label}
              </Link>

              <Link
                href={slide.secondaryCta.href}
                className="px-5 py-2.5 rounded-full text-sm md:text-base font-semibold
                  border border-white/70 text-white bg-white/5
                  hover:bg-white/15 hover:-translate-y-[1px]
                  transition-all duration-200"
              >
                {slide.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
       {/* RIGHT SIDE IMAGE */}
{/* RIGHT SIDE IMAGE */}
<div className="w-1/2">

 

  {/* 2) Radial gradient glow behind person */}
  <div className="absolute  
    w-[420px] h-[420px] rounded-full blur-3xl opacity-70
    bg-[radial-gradient(circle,rgba(255,255,255,0.45),rgba(86,36,208,0.35),rgba(176,14,165,0.25),transparent)]" />

  {/* 3) Feathered mask effect */}
  

  {/* 4) Glow outline (AI neon edge) */}
  <img
    src={slide.image}
    alt={slide.title}
    className="
      relative z-10 w-full h-full object-contain 
     
      
    "
  />

  {/* 5) AI hologram scan lines */}
  <div className="absolute inset-0 pointer-events-none opacity-20 
    bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.15)_0px,rgba(255,255,255,0.15)_1px,transparent_2px,transparent_4px)]" />

</div>


        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2
            bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-9 md:h-9
            rounded-full flex items-center justify-center text-lg font-bold
            transition-all duration-200"
        >
          ‹
        </button>

        <button
          onClick={next}
          className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2
            bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-9 md:h-9
            rounded-full flex items-center justify-center text-lg font-bold
            transition-all duration-200"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                i === current ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}