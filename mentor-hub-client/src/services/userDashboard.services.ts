import { cookies } from "next/headers";
import { env } from "../types/env";

const API_URL = env.API_URL;

export const studentService = {
  // ---------------------------------------------------------
  // GET STUDENT PROFILE
  // ---------------------------------------------------------
  async getStudentProfile() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/student/profile`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch student profile" },
      };
    }
  },

  // ---------------------------------------------------------
  // UPDATE STUDENT PROFILE
  // ---------------------------------------------------------
  async updateStudentProfile(payload: {
    name?: string;
    email?: string;
    phone?: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/student/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to update student profile" },
      };
    }
  },

  // ---------------------------------------------------------
  // BOOK A SESSION 
  // ---------------------------------------------------------
  async bookSession(payload: {
    tutorId: string;
    date: string;
    startTime: string;
    endTime: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      return await res.json(); 
    } catch (err) {
      return {
        success: false,
        message: "Failed to book session",
      };
    }
  },



// ---------------------------------------------------------
// update booking status
// ---------------------------------------------------------
async completeBooking(bookingId: string) {
  try {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/student/bookings/${bookingId}/complete`, {
      method: "PUT",
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: { message: "Failed to complete booking" },
    };
  }
},





  // ---------------------------------------------------------
  // GET UPCOMING BOOKINGS
  // ---------------------------------------------------------
  async getUpcomingBookings() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/student/bookings/upcoming`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["student-upcoming-bookings"] },

      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch upcoming bookings" },
      };
    }
  },

  // ---------------------------------------------------------
  // GET PAST BOOKINGS
  // ---------------------------------------------------------
  async getPastBookings() {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/student/bookings/past`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
         next: { tags: ["student-past-bookings"] },

      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to fetch past bookings" },
      };
    }
  },


  
 async deleteAccountService() {
  try {
    const res = await fetch(`${env.AUTH_URL}/student/delete-profile`, {
      method: "DELETE",
      credentials: "include",   // ⭐ correct place
    });

    return await res.json();    // now safe
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
},



  // ---------------------------------------------------------
  // LEAVE REVIEW
  // ---------------------------------------------------------
  async leaveReview(payload: {
    bookingId: string;
    rating: number;
    comment?: string;
  }) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: { message: "Failed to submit review" },
      };
    }
  },
};