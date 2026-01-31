
import { cookies } from "next/headers";
import { env } from "../types/env";

const API_URL = env.API_URL;

export interface CategoryData {
  name: string;
}

export const categoryService = {
 getCategories: async () => {
  const res = await fetch(`${API_URL}/categories`, {
    next: { tags: ["categories"] },
  });

  const data = await res.json();
  return { data };
},


  createCategory: async (data: CategoryData) => {
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
  },
};