
import { env } from "../types/env"

const API_URL = env.API_URL

export const bookingService = {
  async createBooking(payload: {
    tutorId: string
    date: string
    startTime: string
    endTime?: string
  }) {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      return await res.json()
    } catch (err) {
      console.error("Booking create error:", err)
      return { success: false, message: "Something went wrong" }
    }
  },

  async getStudentBookings() {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        cache: "no-store",
      })
      return await res.json()
    } catch (err) {
      console.error("Student booking fetch error:", err)
      return []
    }
  },

  async getTutorBookings() {
    try {
      const res = await fetch(`${API_URL}/bookings/tutor`, {
        cache: "no-store",
      })
      return await res.json()
    } catch (err) {
      console.error("Tutor booking fetch error:", err)
      return []
    }
  },

  async updateStatus(id: string, action: "CONFIRM" | "REJECT") {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      return await res.json()
    } catch (err) {
      console.error("Booking update error:", err)
      return { success: false }
    }
  },
}