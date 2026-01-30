import { cookies } from "next/headers"
import { env } from "../types/env"

const API_URL = env.API_URL

export const tutorService = {
  // ---------------------------------------------------------
  // GET ALL TUTORS (with optional filters)
  // ---------------------------------------------------------
  async getTutors(params?: Record<string, string>) {
    try {
      const url = new URL(`${API_URL}/tutors`)

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) url.searchParams.append(key, value)
        })
      }

      const res = await fetch(url.toString(), {
        next: { tags: ["tutors"] },
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch tutors" } }
    }
  },

  // ---------------------------------------------------------
  // GET FEATURED TUTORS
  // ---------------------------------------------------------
  async getFeaturedTutors() {
    try {
      const res = await fetch(`${API_URL}/tutors/featured`, {
        next: { tags: ["tutors"] },
      })

      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch featured tutors" } }
    }
  },

  // ---------------------------------------------------------
  // GET TUTOR BY ID (with reviews, category, availability)
  // ---------------------------------------------------------
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

  // ---------------------------------------------------------
  // GET ALL CATEGORIES
  // ---------------------------------------------------------
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