// src/services/admin.services.ts
import { cookies } from "next/headers";
import { env } from "@/src/types/env";

export const adminService = {
  getAllBookings: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/admin/bookings`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  },

  getAllUsers: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/admin/getAllUsers`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return res.json();
  },

  getAllTutors: async () => {
    const cookieStore = await cookies();

    const res = await fetch(`${env.API_URL}/admin/tutors`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    return res.json();
  },
};