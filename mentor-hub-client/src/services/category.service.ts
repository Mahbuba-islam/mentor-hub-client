
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;


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



// delete category
deleteCategory: async (id: string) => {
  const cookieStore = await cookies()

  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "DELETE",
    headers: {
      Cookie: cookieStore.toString(),
    },
  })

  return res.json()
},




//category update

  updateCategory: async (id: string, data: CategoryData) => {
  const cookieStore = await cookies()

  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
    },
    body: JSON.stringify(data),
  })

  return res.json()
}
};