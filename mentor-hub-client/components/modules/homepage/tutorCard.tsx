"use client";

import Link from "next/link";

type TutorCardProps = {
  id: string;
  bio?: string | null;
  categoryName?: string;
  price?: number | null;
  rating?: number;
  totalReviews?: number;
  user: {
    name: string;
    image: string | null;
  };
};

export default function TutorCard({
  id,
  bio,
  categoryName,
  price,
  rating,
  totalReviews,
  user,
  subject
}: TutorCardProps) {
  return (
    <div
          key={id}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#5624D0] to-[#b00ea5] flex items-center justify-center text-white font-bold text-xl shadow">
              {user?.name?.charAt(0) ?? "?"}
            </div>

            <div>
              <p className="text-lg font-bold text-gray-900">
                {user?.name ?? "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                {categoryName}
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 text-sm line-clamp-3 leading-relaxed">
            {bio}
          </p>

          {/* Subjects */}
          <div className="mt-4 flex flex-wrap gap-2">
            {subject?.map((sub) => (
              <span
                key={sub}
                className="px-3 py-1 bg-gradient-to-r from-[#f3e8ff] to-[#ffe6fa] text-[#5624D0] font-medium rounded-full text-xs shadow-sm"
              >
                {sub}
              </span>
            ))}
          </div>

          {/* Rating & Price */}
          <div className="mt-5 flex justify-between items-center text-sm font-medium">
            <span className="text-gray-700">
              ⭐ {rating} ({totalReviews} reviews)
            </span>
            <span className="text-[#5624D0] font-bold">
              ${price}/hr
            </span>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <Link
              href={`/tutorDetails/${id}`}
              className="block w-full text-center py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-[#5624D0] to-[#b00ea5] shadow hover:opacity-90 transition"
            >
              See Details for Booking
            </Link>
          </div>
        </div>
  );
}