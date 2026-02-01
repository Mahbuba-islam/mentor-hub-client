"use client";

export default function SuccessModal({ open, onClose, onDashboard, onHome }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg space-y-4 text-center">
        <h2 className="text-2xl font-bold text-green-600">Booking Successful 🎉</h2>
        <p className="text-gray-600 text-sm">
          Your session has been booked successfully. What would you like to do next?
        </p>

        <div className="flex flex-col gap-3 mt-4">
          <button
            onClick={onDashboard}
            className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            Go to Dashboard
          </button>

          <button
            onClick={onHome}
            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Go to Home
          </button>
        </div>

        <button
          onClick={onClose}
          className="text-xs text-gray-500 mt-2 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
}