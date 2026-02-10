"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// ⭐ CREATE BOOKING
export async function createBooking(payload: {
  tutorId: string;
  date: string;
  startTime: string;
  endTime?: string;
}) {
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
    console.error("Booking create error:", err);
    return { success: false, message: "Something went wrong" };
  }
}

// ⭐ GET STUDENT BOOKINGS
export async function getStudentBookings() {
  try {
    const res = await fetch(`${API_URL}/bookings`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (err) {
    console.error("Student booking fetch error:", err);
    return [];
  }
}

// ⭐ GET TUTOR BOOKINGS
export async function getTutorBookings() {
  try {
    const res = await fetch(`${API_URL}/bookings/tutor`, {
      cache: "no-store",
    });
    return await res.json();
  } catch (err) {
    console.error("Tutor booking fetch error:", err);
    return [];
  }
}

// ⭐ UPDATE BOOKING STATUS
export async function updateStatus(
  id: string,
  action: "CONFIRM" | "REJECT"
) {
  try {
    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    return await res.json();
  } catch (err) {
    console.error("Booking update error:", err);
    return { success: false };
  }
}

// ⭐ DELETE BOOKING
export async function deleteBooking(id: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });

    return await res.json();
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong while deleting booking",
    };
  }
}