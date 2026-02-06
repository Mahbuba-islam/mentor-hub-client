// "use server"

// import { auth } from "@/lib/auth"
// import { studentService } from "@/src/services/userDashboard.services"
// import { revalidateTag } from "next/cache"

// // -----------------------------
// // GET STUDENT PROFILE
// // -----------------------------
// export const getStudentProfileAction = async () => {
//   return await studentService.getStudentProfile()
// }

// // -----------------------------
// // UPDATE STUDENT PROFILE
// // -----------------------------
// export const updateStudentProfileAction = async (payload: any) => {
//   const res = await studentService.updateStudentProfile(payload);

//   // Backend returns: { data: { message, profile }, error: null }
//   if (res?.data?.profile) {
//     revalidateTag("student-profile", "page");

//     return {
//       success: true,
//       data: res.data.profile, // ⭐ send updated profile only
//     };
//   }

//   return {
//     success: false,
//     data: null,
//   };
// };


// // BOOK SESSION
// export const bookSessionAction = async (payload: {
//   tutorId: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// }) => {
//   const res = await studentService.bookSession(payload);
//   revalidateTag("tutors", "max");
//   return res;
// };


// //update booking status

// // -----------------------------
// // COMPLETE BOOKING
// // -----------------------------
// export const completeBookingAction = async (bookingId: string) => {
//   const res = await studentService.completeBooking(bookingId);
//   revalidateTag("tutors", "page");
//   return res;
// };






// // -----------------------------
// // GET UPCOMING BOOKINGS
// // -----------------------------
// export const getUpcomingBookingsAction = async () => {
//   return await studentService.getUpcomingBookings()
// }

// // -----------------------------
// // GET PAST BOOKINGS
// // -----------------------------
// export const getPastBookingsAction = async () => {
//   return await studentService.getPastBookings()
// }

// // -----------------------------
// // LEAVE REVIEW
// // -----------------------------
// export const leaveReviewAction = async (payload: any) => {
//   const res = await studentService.leaveReview(payload)
//   revalidateTag("student-reviews", "page")
//   return res
// }




// export async function deleteAccountAction() {
//   try {
//     const res = await studentService.deleteAccountService();

//     if (!res.success) {
//       return { success: false, message: res.message };
//     }

//     // Logout user after delete
//     await auth.api.signOut();

//     return { success: true };
//   } catch (error) {
//     return { success: false, message: "Something went wrong" };
//   }
// }




// // "use server"

// // import { auth } from "@/lib/auth"
// // import { studentService } from "@/src/services/userDashboard.services"
// // import { revalidateTag } from "next/cache"

// // // -----------------------------
// // // GET STUDENT PROFILE
// // // -----------------------------
// // export const getStudentProfileAction = async () => {
// //   return await studentService.getStudentProfile()
// // }

// // // -----------------------------
// // // UPDATE STUDENT PROFILE
// // // -----------------------------
// // export const updateStudentProfileAction = async (payload: any) => {
// //   const res = await studentService.updateStudentProfile(payload)

// //   if (res?.data?.profile) {
// //     revalidateTag("student-profile", "default")   // ⭐ FIXED
// //     return {
// //       success: true,
// //       data: res.data.profile,
// //     }
// //   }

// //   return { success: false, data: null }
// // }

// // // -----------------------------
// // // BOOK SESSION
// // // -----------------------------
// // export const bookSessionAction = async (payload: {
// //   tutorId: string
// //   date: string
// //   startTime: string
// //   endTime: string
// // }) => {
// //   const res = await studentService.bookSession(payload)
// //   revalidateTag("student-bookings", "default")   
// //   revalidateTag("tutors", "default")             
// //   return res
// // }

// // // -----------------------------
// // // COMPLETE BOOKING
// // // -----------------------------
// // export const completeBookingAction = async (bookingId: string) => {
// //   const res = await studentService.completeBooking(bookingId)
// //   revalidateTag("student-bookings", "default")   // ⭐ FIXED
// //   revalidateTag("tutors", "default")             // ⭐ IMPORTANT FIX
// //   return res
// // }

// // // -----------------------------
// // // GET UPCOMING BOOKINGS
// // // -----------------------------
// // export const getUpcomingBookingsAction = async () => {
// //   return await studentService.getUpcomingBookings()
// // }

// // // -----------------------------
// // // GET PAST BOOKINGS
// // // -----------------------------
// // export const getPastBookingsAction = async () => {
// //   return await studentService.getPastBookings()
// // }

// // // -----------------------------
// // // LEAVE REVIEW
// // // -----------------------------
// // export const leaveReviewAction = async (payload: any) => {
// //   const res = await studentService.leaveReview(payload)
// //   revalidateTag("student-reviews", "default")    // ⭐ FIXED
// //   revalidateTag("tutors", "default")             // ⭐ IMPORTANT FIX
// //   return res
// // }

// // // -----------------------------
// // // DELETE ACCOUNT
// // // -----------------------------
// // export async function deleteAccountAction() {
// //   try {
// //     const res = await studentService.deleteAccountService()

// //     if (!res.success) {
// //       return { success: false, message: res.message }
// //     }

// //     await auth.api.signOut()
// //     return { success: true }
// //   } catch (error) {
// //     return { success: false, message: "Something went wrong" }
// //   }
// // }




//github

"use server"

import { auth } from "@/lib/auth"
import { studentService } from "@/src/services/userDashboard.services"
import {  ReviewWithStudent } from "@/src/types/review.types"
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
export const leaveReviewAction = async (payload:ReviewWithStudent) => {
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