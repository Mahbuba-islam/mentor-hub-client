import { cookies } from "next/headers";

export interface TutorProfileData {
  bio: string;
  price: number;
  categoryId: string;
  subject: string[];
  experience?: string;
  isFeatured?: boolean;
}

export interface AvailabilitySlot {
  date: string;
  timeSlots: string[];
}

export const tutorService = {
  // ⭐ Helper: Build cookie header
  buildCookieHeader: async () => {
    const cookieStore = await cookies();
    return cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");
  },

  // ⭐ CREATE TUTOR PROFILE
  createTutorProfile: async (data: TutorProfileData) => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  // ⭐ GET TUTOR PROFILE (Dashboard)
  getTutorProfile: async () => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/dashboard`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    return res.json();
  },

  // ⭐ UPDATE TUTOR PROFILE
  updateTutorProfile: async (data: TutorProfileData) => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  // ⭐ SET AVAILABILITY
  setAvailability: async (slots: AvailabilitySlot) => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/availability`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
        body: JSON.stringify(slots),
      }
    );

    return res.json();
  },

  // ⭐ GET AVAILABILITY
  getAvailability: async () => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/availability`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    return res.json();
  },

  // ⭐ GET TEACHING SESSIONS
  getSessions: async () => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/sessions`,
      {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    return res.json();
  },

  // ⭐ GET RATINGS & REVIEWS
  getRatingsAndReviews: async () => {
    const cookieHeader = await tutorService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tutors/reviews`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    return res.json();
  },
};