import { cookies } from "next/headers"
import { env } from "../types/env"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

const API_URL = env.API_URL

// Helper: Convert Next.js cookies → real cookie header
function getCookieHeader() {
  const cookieStore = cookies() as unknown as ReadonlyRequestCookies
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ")
}

export const tutorService = {
  // ---------------------------------------------------------
  // GET TUTOR PROFILE (for dashboard/profile page)
  // ---------------------------------------------------------
 async getTutorProfile({ search = "", categoryName = "" } = {}) {
  try {
    const url = new URL(`${API_URL}/tutors`);

    if (search) url.searchParams.set("search", search);
    if (categoryName) url.searchParams.set("categoryName", categoryName);

    const res = await fetch(url.toString(), {
      cache: "no-store",
    });

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to fetch tutor profile" },
    };
  }
},


  // ---------------------------------------------------------
  // UPDATE TUTOR PROFILE
  // ---------------------------------------------------------
  async updateTutorProfile(payload: {
    bio?: string
    price?: number
    subject?: string[]
    categoryId?: string
  }) {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/tutors/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to update tutor profile" } }
    }
  },



 
  
  // ---------------------------------------------------------
  // GET TUTOR DASHBOARD DATA
  // ---------------------------------------------------------
  async getTutorDashboard() {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/tutors/dashboard`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch dashboard data" } }
    }
  },



 




  // ---------------------------------------------------------
  // UPDATE AVAILABILITY
  // ---------------------------------------------------------
  async updateAvailability(payload: { date: string; timeSlots: string[] }) {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/tutors/availability`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to update availability" } }
    }
  },

  // ---------------------------------------------------------
  // GET TUTOR SESSIONS
  // ---------------------------------------------------------
  async getTutorSessions() {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/tutors/sessions`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch tutor sessions" } }
    }
  },

  // ---------------------------------------------------------
  // PUBLIC ENDPOINTS 
  // ---------------------------------------------------------
  async getTutors(params?: Record<string, string>) {
    try {
      const url = new URL(`${API_URL}/tutors`)
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) url.searchParams.append(key, value)
        })
      }
      const res = await fetch(url.toString(), { next: { tags: ["tutors"] } })
      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch tutors" } }
    }
  },





async getFeaturedTutors() {
  try {
    const res = await fetch(`${API_URL}/tutors/featured`, {
      cache: "no-store",
      next: { tags: ["tutors"] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to fetch featured tutors" },
    };
  }
},

  




  

  async getTutorById(id: string) {
    try {
      const res = await fetch(`${API_URL}/tutors/${id}`, {
        next: { tags: ["tutor", id] },
      })
      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch tutor details" } }
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${API_URL}/categories`, {
        next: { tags: ["categories"] },
      })
      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch categories" } }
    }
  },
}