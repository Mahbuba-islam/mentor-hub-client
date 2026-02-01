"use client";

import { TutorProfile } from "@/src/types/tutor.types";

export function TutorsCard({ tutors }: { tutors: TutorProfile[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors?.map((tutor) => (
        <div
          key={tutor.id}
          className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-all"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
              {tutor.user?.name?.charAt(0) ?? "?"}
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-800">
                {tutor.user?.name ?? "Unknown"}
              </p>
              <p className="text-sm text-gray-500">{tutor.category?.name}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-gray-700 text-sm line-clamp-3">
            {tutor.bio}
          </p>

          {/* Subjects */}
          <div className="mt-3 flex flex-wrap gap-2">
            {tutor.subject?.map((sub) => (
              <span
                key={sub}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {sub}
              </span>
            ))}
          </div>

          {/* Rating & Price */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>⭐ {tutor.rating} ({tutor.totalReviews} reviews)</span>
            <span>${tutor.price}/hr</span>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <a
              href={`/tutorDetails/${tutor.id}`}
              className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              See Details for Booking
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}