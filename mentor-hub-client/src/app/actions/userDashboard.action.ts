"use server"

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
export const updateStudentProfileAction = async (data: any) => {
  const res = await studentService.updateStudentProfile(data)
  revalidateTag("student-profile", "page")
  return res
}

// -----------------------------
// BOOK SESSION
// -----------------------------
export const bookSessionAction = async (payload: any) => {
  const res = await studentService.bookSession(payload)
  revalidateTag("student-bookings", "page")
  return res
}

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