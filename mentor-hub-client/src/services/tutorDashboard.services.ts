// src/services/tutor.service.ts
import { cookies } from "next/headers";
import { env } from "@/src/types/env";

export interface TutorProfileData {
  bio: string;
  price: number;
  categoryId: string;
  subject: string[];   
  experience?: string;
}

export interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

export const tutorService = {
  // CREATE TUTOR PROFILE
  createTutorProfile: async (data: TutorProfileData) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  // GET TUTOR PROFILE (needed for update)
  getTutorProfile: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/tutors/dashboard`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return res.json();
  },

  // UPDATE TUTOR PROFILE
  updateTutorProfile: async (data: TutorProfileData) => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/tutors/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(data),
    });

    return res.json();
  },

  // SET AVAILABILITY
 setAvailability: async (slots:AvailabilitySlot) => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/tutors/availability`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(slots), // 🔥 FIXED
  });

  return res.json();
},




getAvailability: async () => {
  const cookieStore = await cookies();

  const res = await fetch(`${env.API_URL}/tutors/availability`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  return res.json();
},



  // GET TEACHING SESSIONS
   
  getSessions: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/tutors/sessions`, {
      method: "GET",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
      cache: "no-store",
    });

    return res.json();
  },



   

  // GET RATINGS & REVIEWS
  getRatingsAndReviews: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/tutor/reviews`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return res.json();
  },
};