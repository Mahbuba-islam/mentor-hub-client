"use server";

import { cookies } from "next/headers";

export const userService = {
  
  async getSession() {
    try {
      const cookieStore = cookies();

      const cookieHeader = (await cookieStore)
        .getAll()
        .map(c => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/get-session`,
        {
          headers: {
            Cookie: cookieHeader,
          },
          cache: "no-store",
          credentials: "include",
        }
      );

      const session = await res.json();

      if (!session) {
        return { data: null, error: { message: "Session missing" } };
      }

      return { data: session, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ⭐ 2) Register user using your backend (NOT BetterAuth)
  async registerUser(data: {
    userId: string;
    name: string;
    email: string;
    role: "STUDENT" | "TUTOR";
  }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      }
    );

    return res.json();
  },

  // ⭐ 3) Admin get all users
  async getAllUsers() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllUsers`,
        {
          next: { tags: ["users"] },
        }
      );

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Failed to fetch users" } };
    }
  },
};