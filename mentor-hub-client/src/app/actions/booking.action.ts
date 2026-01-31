
"use server";

import { adminService } from "@/src/services/admin.services";

export const getBookingsAction = async () => {
  return await adminService.getAllBookings();
};