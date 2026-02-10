"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface CategoryData {
  name: string;
}

// ⭐ GET CATEGORIES
export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    next: { tags: ["categories"] },
  });

  const data = await res.json();
  return { data };
}

// ⭐ CREATE CATEGORY
export async function createCategory(data: CategoryData) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/admin/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// ⭐ DELETE CATEGORY
export async function deleteCategory(id: string) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.json();
}

// ⭐ UPDATE CATEGORY
export async function updateCategory(id: string, data: CategoryData) {
  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  });

  return res.json();
}