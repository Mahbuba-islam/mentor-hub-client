"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL!;

// ⭐ Helper: Build cookie header
export async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

// ⭐ GET STUDENT PROFILE
export async function getStudentProfile() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/profile`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch student profile" } };
  }
}

// ⭐ UPDATE STUDENT PROFILE
export async function updateStudentProfile(payload: {
  name?: string;
  email?: string;
  phone?: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to update student profile" } };
  }
}

// ⭐ BOOK A SESSION
export async function bookSession(payload: {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch {
    return { success: false, message: "Failed to book session" };
  }
}

// ⭐ COMPLETE BOOKING
export async function completeBooking(bookingId: string) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/bookings/${bookingId}/complete`, {
      method: "PUT",
      headers: { Cookie: cookieHeader },
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to complete booking" } };
  }
}

// ⭐ GET UPCOMING BOOKINGS
export async function getUpcomingBookings() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/bookings/upcoming`, {
      headers: { Cookie: cookieHeader },
      next: { tags: ["student-upcoming-bookings"] },
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch upcoming bookings" } };
  }
}

// ⭐ GET PAST BOOKINGS
export async function getPastBookings() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/student/bookings/past`, {
      headers: { Cookie: cookieHeader },
      next: { tags: ["student-past-bookings"] },
      credentials: "include",
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch past bookings" } };
  }
}

// ⭐ DELETE ACCOUNT
export async function deleteAccountService() {
  try {
    const res = await fetch(`${AUTH_URL}/student/delete-profile`, {
      method: "DELETE",
      credentials: "include",
    });

    return await res.json();
  } catch {
    return { success: false, message: "Something went wrong" };
  }
}

// ⭐ LEAVE REVIEW
export async function leaveReview(payload: {
  bookingId: string;
  rating: number;
  comment?: string;
}) {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    return { data: await res.json(), error: null };
  } catch {
    return { data: null, error: { message: "Failed to submit review" } };
  }
}