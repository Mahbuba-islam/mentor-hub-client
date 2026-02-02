"use client";

import { useState } from "react";
import ReviewModal from "./ReviewModal";
import ErrorModal from "./ErrorModal";
import { completeBookingAction, leaveReviewAction } from "@/src/app/actions/userDashboard.action";

export default function BookSessionUi({ upcoming, past }) {
  const [pastList, setPastList] = useState(past);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // COMPLETE BUTTON
const handleComplete = async (bookingId) => {
  const res = await completeBookingAction(bookingId);

  if (!res?.data?.success) {
    setErrorOpen(true);
    return;
  }

  // Update UI instantly
  setPastList((prev) =>
    prev.map((item) =>
      item.id === bookingId ? { ...item, status: "COMPLETED" } : item
    )
  );

  setSelectedBooking(bookingId);
  setReviewOpen(true); // open modal
};

// REVIEW SUBMIT
const handleReviewSubmit = async (rating, comment) => {
  const res = await leaveReviewAction({
    bookingId: selectedBooking,
    rating,
    comment,
  });
console.log('leaveReview', res);
  if (!res?.data?.success) {
    setErrorOpen(true);
    return;
  }

  setReviewOpen(false);
};

  return (
    <div className="space-y-12">
      {/* UPCOMING BOOKINGS */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Upcoming Sessions
        </h2>

        {upcoming.length === 0 ? (
          <p className="text-gray-500 text-sm">No upcoming sessions.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((b) => (
              <div
                key={b.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">
                  <p className="text-gray-600 text-sm">
                    {new Date(b.date).toLocaleDateString()}
                  </p>
                  <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                    {b.status}
                  </span>
                </div>

                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {b.startTime} – {b.endTime}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                    {b.tutor?.user?.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {b.tutor?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {b.tutor?.user?.email}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200">
                    View Details
                  </button>

                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PAST BOOKINGS */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Past Sessions
        </h2>

        {pastList.length === 0 ? (
          <p className="text-gray-500 text-sm">No past sessions found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastList.map((b) => (
              <div
                key={b.id}
                className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-600 text-sm">
                  {new Date(b.date).toLocaleDateString()}
                </p>

                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {b.startTime} – {b.endTime}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                    {b.tutor?.user?.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {b.tutor?.user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {b.tutor?.user?.email}
                    </p>
                  </div>
                </div>

                {b.status === "COMPLETED" ? (
                  <button
                    disabled
                    className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg cursor-default"
                  >
                    Completed
                  </button>
                ) : (
                  <button
                    onClick={() => handleComplete(b.id)}
                    className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Review Modal (Leave Review Only) */}
      <ReviewModal
  open={reviewOpen}
  onClose={() => setReviewOpen(false)}
  onSubmit={handleReviewSubmit}
/>


      {/* Error Modal */}
      <ErrorModal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        message="Something went wrong"
      />
    </div>
  );
}