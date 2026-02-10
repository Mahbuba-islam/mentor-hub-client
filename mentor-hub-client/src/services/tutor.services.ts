"use server";

import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

// ⭐ Helper: Convert Next.js cookies → real cookie header
function getCookieHeader() {
  const cookieStore = cookies() as unknown as ReadonlyRequestCookies;
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

// ---------------------------------------------------------
// GET TUTOR PROFILE (public listing)
// ---------------------------------------------------------
export async function getTutorProfile({
  search = "",
  categoryName = "",
} = {}) {
  try {
    const url = new URL(`${API_URL}/tutors`);

    if (search) url.searchParams.set("search", search);
    if (categoryName) url.searchParams.set("categoryName", categoryName);

    const res = await fetch(url.toString(), { cache: "no-store" });
    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch tutor profile" } };
  }
}

// ---------------------------------------------------------
// UPDATE TUTOR PROFILE
// ---------------------------------------------------------
export async function updateTutorProfile(payload: {
  bio?: string;
  price?: number;
  subject?: string[];
  categoryId?: string;
}) {
  try {
    const cookieHeader = getCookieHeader();

    const res = await fetch(`${API_URL}/tutors/update-profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to update tutor profile" } };
  }
}

// ---------------------------------------------------------
// GET TUTOR DASHBOARD DATA
// ---------------------------------------------------------
export async function getTutorDashboard() {
  try {
    const cookieHeader = getCookieHeader();

    const res = await fetch(`${API_URL}/tutors/dashboard`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch dashboard data" } };
  }
}

// ---------------------------------------------------------
// UPDATE AVAILABILITY
// ---------------------------------------------------------
export async function updateAvailability(payload: {
  date: string;
  timeSlots: string[];
}) {
  try {
    const cookieHeader = getCookieHeader();

    const res = await fetch(`${API_URL}/tutors/availability`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to update availability" } };
  }
}

// ---------------------------------------------------------
// GET TUTOR SESSIONS
// ---------------------------------------------------------
export async function getTutorSessions() {
  try {
    const cookieHeader = getCookieHeader();

    const res = await fetch(`${API_URL}/tutors/sessions`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch tutor sessions" } };
  }
}

// ---------------------------------------------------------
// PUBLIC ENDPOINTS
// ---------------------------------------------------------
export async function getTutors(params?: Record<string, string>) {
  try {
    const url = new URL(`${API_URL}/tutors`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) url.searchParams.append(key, value);
      });
    }

    const res = await fetch(url.toString(), { next: { tags: ["tutors"] } });
    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch tutors" } };
  }
}

export async function getFeaturedTutors() {
  try {
    const res = await fetch(`${API_URL}/tutors/featured`, {
      cache: "no-store",
      next: { tags: ["tutors"] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return {
      data: null,
      error: { message: "Failed to fetch featured tutors" },
    };
  }
}

export async function getTutorById(id: string) {
  try {
    const res = await fetch(`${API_URL}/tutors/${id}`, {
      next: { tags: ["tutor", id] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch tutor details" } };
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { tags: ["categories"] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch categories" } };
  }
}