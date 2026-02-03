"use server"

import { auth } from "@/lib/auth"
import { studentService } from "@/src/services/userDashboard.services"
import { revalidateTag } from "next/cache"

// -----------------------------
// GET STUDENT PROFILE
// -----------------------------
export const getStudentProfileAction = async () => {
  return await studentService.getStudentProfile()
}

// -----------------------------
// UPDATE STUDENT PROFILE
// -----------------------------
export const updateStudentProfileAction = async (payload: any) => {
  const res = await studentService.updateStudentProfile(payload);

  // Backend returns: { data: { message, profile }, error: null }
  if (res?.data?.profile) {
    revalidateTag("student-profile", "page");

    return {
      success: true,
      data: res.data.profile, // ⭐ send updated profile only
    };
  }

  return {
    success: false,
    data: null,
  };
};


// BOOK SESSION
export const bookSessionAction = async (payload: {
  tutorId: string;
  date: string;
  startTime: string;
  endTime: string;
}) => {
  const res = await studentService.bookSession(payload);
  revalidateTag("student-bookings", "page");
  return res;
};


//update booking status

// -----------------------------
// COMPLETE BOOKING
// -----------------------------
export const completeBookingAction = async (bookingId: string) => {
  const res = await studentService.completeBooking(bookingId);
  revalidateTag("student-bookings", "page");
  return res;
};






// -----------------------------
// GET UPCOMING BOOKINGS
// -----------------------------
export const getUpcomingBookingsAction = async () => {
  return await studentService.getUpcomingBookings()
}

// -----------------------------
// GET PAST BOOKINGS
// -----------------------------
export const getPastBookingsAction = async () => {
  return await studentService.getPastBookings()
}

// -----------------------------
// LEAVE REVIEW
// -----------------------------
export const leaveReviewAction = async (payload: any) => {
  const res = await studentService.leaveReview(payload)
  revalidateTag("student-reviews", "page")
  return res
}




export async function deleteAccountAction() {
  try {
    const res = await studentService.deleteAccountService();

    if (!res.success) {
      return { success: false, message: res.message };
    }

    // Logout user after delete
    await auth.api.signOut();

    return { success: true };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}