"use client";

import Image from "next/image";
import Link from "next/link";

export type TutorCardProps = {
  id: string;
  bio?: string | null;
  category?: string;
  price?: number | null;
  rating?: number;
  subject: string[];
  totalReviews?: number;
  user: {
    name: string;
    image: string | null;
  };
};

export default function TutorCard({
  id,
  bio,
  category,
  price,
  rating,
  totalReviews,
  user,
  subject
}: TutorCardProps) {
  return (
    <div
      key={id}
      className="rounded-xl border border-gray-200 shadow-sm hover:shadow-lg 
      transition-all duration-300 hover:-translate-y-1 overflow-hidden bg-white p-4"
    >
      {/* Top Image - Semi Rounded */}
      <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
        <Image
          src={user?.image || "/default-avatar.png"}
          alt={user?.name || "Tutor"}
          width={400}
          height={300}
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Name */}
        <p className="text-base font-semibold text-gray-900 leading-tight">
          {user?.name ?? "Unknown"}
        </p>

        {/* Category */}
        <p className="text-xs text-gray-500 mt-0.5">{category}</p>

        {/* Bio */}
        <p className="mt-2 text-gray-700 text-xs line-clamp-2 leading-relaxed">
          {bio}
        </p>

        {/* Subjects */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {subject
            ?.map((sub) => sub.trim())
            .filter((sub) => sub !== "")
            .map((sub) => (
              <span
                key={sub}
                className="px-2 py-0.5 bg-[#f3e8ff] text-[#5624D0] 
                font-medium rounded-full text-[8px] shadow-sm"
              >
                {sub}
              </span>
            ))}
        </div>

        {/* Rating & Price */}
        {/* <div className="mt-4 flex justify-between items-center text-sm font-medium">
          <span className="text-gray-700">
            ⭐ {rating} ({totalReviews} reviews)
          </span>
          <span className="text-[#5624D0] font-bold">${price}/hr</span>
        </div> */}

        {/* CTA Button */}
        <Link
          href={`/tutorDetails/${id}`}
          className="block w-full text-center py-2 mt-5 rounded-md font-semibold 
          text-white bg-gradient-to-r from-[#5624D0] to-[#b00ea5] text-xs
          shadow hover:opacity-90 transition"
        >
          See Details for Booking
        </Link>
      </div>
    </div>
  );
}