"use server";

import { revalidateTag } from "next/cache";
import { categoryService, CategoryData } from "@/src/services/category.service";

export const createCategoryAction = async (data: CategoryData) => {
  const res = await categoryService.createCategory(data);
  revalidateTag("categories", "page");
  return res;
};

export const getCategoriesAction = async () => {
  return await categoryService.getCategories();
};





export async function deleteCategoryAction(id: string) {
  try {
    await categoryService.deleteCategory(id)

    // Revalidate category list
    revalidateTag("categories", "page")

    return { success: true }
  } catch (error) {
    return { success: false, message: "Failed to delete category" }
  }
}



export async function updateCategoryAction(id: string, data: { name: string }) {
  try {
    await categoryService.updateCategory(id, data)
    revalidateTag("categories", "page")

    return { success: true }
  } catch (err) {
    return { success: false, message: "Error updating category" }
  }
}
