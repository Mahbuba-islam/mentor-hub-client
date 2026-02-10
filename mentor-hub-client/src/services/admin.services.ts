import { cookies } from "next/headers";

export const adminService = {
  // ⭐ Helper: Build cookie header
  buildCookieHeader: async () => {
    const cookieStore = await cookies();
    return cookieStore
      .getAll()
      .map(c => `${c.name}=${c.value}`)
      .join("; ");
  },

  // ⭐ 1) Get all bookings
  getAllBookings: async () => {
    const cookieHeader = await adminService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/bookings`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    if (!res.ok) return null;
    return res.json();
  },

  // ⭐ 2) Get all users
  getAllUsers: async () => {
    const cookieHeader = await adminService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/getAllUsers`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    return res.json();
  },

  // ⭐ 3) Get all tutors
  getAllTutors: async () => {
    const cookieHeader = await adminService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/tutors`,
      {
        headers: {
          Cookie: cookieHeader,
        },
        cache: "no-store",
        credentials: "include",
      }
    );

    return res.json();
  },

  // ⭐ 4) Manage user status (ban/unban)
  manageUserStatus: async (userId: string, status: "ACTIVE" | "BANNED") => {
    const cookieHeader = await adminService.buildCookieHeader();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      }
    );

    return res.json();
  },
};