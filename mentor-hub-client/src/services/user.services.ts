"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL!;

// ⭐ Helper: Build cookie header
export async function buildCookieHeader() {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

// ⭐ 1) Get Session
export async function getSession() {
  try {
    const cookieHeader = await buildCookieHeader();

    const res = await fetch(`${AUTH_URL}/get-session`, {
      headers: { Cookie: cookieHeader },
      cache: "no-store",
      credentials: "include",
    });

    const session = await res.json();

    if (!session) {
      return { data: null, error: { message: "Session missing" } };
    }

    return { data: session, error: null };
  } catch {
    return { data: null, error: { message: "Something went wrong" } };
  }
}

// ⭐ 2) Register user
export async function registerUser(data: {
  userId: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR";
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
}

// ⭐ 3) Admin get all users
export async function getAllUsers() {
  try {
    const res = await fetch(`${API_URL}/admin/getAllUsers`, {
      next: { tags: ["users"] },
    });

    const data = await res.json();
    return { data, error: null };
  } catch {
    return { data: null, error: { message: "Failed to fetch users" } };
  }
}