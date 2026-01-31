
"use server";

import { adminService } from "@/src/services/admin.services";

export const getUsersAction = async () => {
  return await adminService.getAllUsers();
};