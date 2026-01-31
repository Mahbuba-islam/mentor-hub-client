import { cookies } from "next/headers"
import { env } from "../types/env"

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = cookies()

      const cookieHeader = (await cookieStore)
        .getAll()
        .map(c => `${c.name}=${c.value}`)
        .join("; ")

      const res = await fetch(`${env.AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
      })

      const session = await res.json()

      console.log("session-data", session)

      if (session === null) {
        return { data: null, error: { message: "session is missing" } }
      }

      return { data: session, error: null }
    } catch (err) {
      console.error(err)
      return { data: null, error: { message: "something went wrong" } }
    }


    

  },

async getAllUsers() {
    try {
      const res = await fetch(`${env.API_URL}/admin/getAllUsers`, {
        next: { tags: ["users"] },
      })
      const data = await res.json()
      return { data, error: null }
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch users" } }
    }
  },


   
}