"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// ⭐ GET SLOTS
export async function getSlots({
  tutorId,
  date,
}: {
  tutorId: string;
  date: string;
}) {
  try {
    const res = await fetch(
      `${API_URL}/availability/${tutorId}?date=${date}`,
      { cache: "no-store" }
    );

    return await res.json();
  } catch (err) {
    console.error("Availability fetch error:", err);
    return { slots: [] };
  }
}

// ⭐ SET AVAILABILITY
export async function setAvailability(payload: {
  tutorId: string;
  date: string;
  timeSlots: string[];
}) {
  try {
    const res = await fetch(`${API_URL}/availability`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return await res.json();
  } catch (err) {
    console.error("Availability set error:", err);
    return { success: false };
  }
}