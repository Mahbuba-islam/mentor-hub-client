
"use server";

import { adminService } from "@/src/services/admin.services";
import { bookingService } from "@/src/services/bookings.services";
import { revalidateTag } from "next/cache";

export const getBookingsAction = async () => {
  return await adminService.getAllBookings();
  
};



export const deleteBookingAction = async (id: string) => {
  const res = await bookingService.deleteBooking(id);

  if (res.success) {
   
    revalidateTag("student-upcoming-bookings", "default");
    revalidateTag("student-past-bookings", 'default');
  }

  return res;
};