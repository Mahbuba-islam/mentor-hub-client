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
