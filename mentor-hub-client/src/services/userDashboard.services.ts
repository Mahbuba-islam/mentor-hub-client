import { cookies } from "next/headers"
import { env } from "../types/env"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

const API_URL = env.API_URL

function getCookieHeader() {
  const cookieStore = cookies() as unknown as ReadonlyRequestCookies
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ")
}

export const studentService = {
  // ---------------------------------------------------------
  // GET STUDENT PROFILE
  // ---------------------------------------------------------
  async getStudentProfile() {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/students/profile`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch student profile" } }
    }
  },

  // ---------------------------------------------------------
  // UPDATE STUDENT PROFILE
  // ---------------------------------------------------------
  async updateStudentProfile(payload: {
    name?: string
    email?: string
    phone?: string
  }) {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/students/update-profile`, {
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
      return { data: null, error: { message: "Failed to update student profile" } }
    }
  },

  // ---------------------------------------------------------
  // BOOK A SESSION
  // ---------------------------------------------------------
  async bookSession(payload: {
    tutorId: string
    date: string
    startTime: string
    endTime: string
  }) {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/students/book-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to book session" } }
    }
  },

  // ---------------------------------------------------------
  // GET UPCOMING BOOKINGS
  // ---------------------------------------------------------
  async getUpcomingBookings() {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/students/bookings/upcoming`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch upcoming bookings" } }
    }
  },

  // ---------------------------------------------------------
  // GET PAST BOOKINGS
  // ---------------------------------------------------------
  async getPastBookings() {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/students/bookings/past`, {
        headers: { Cookie: cookieHeader },
        cache: "no-store",
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch past bookings" } }
    }
  },

  // ---------------------------------------------------------
  // LEAVE REVIEW
  // ---------------------------------------------------------
  async leaveReview(payload: {
    bookingId: string
    rating: number
    comment?: string
  }) {
    try {
      const cookieHeader = getCookieHeader()

      const res = await fetch(`${API_URL}/students/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to submit review" } }
    }
  },
}