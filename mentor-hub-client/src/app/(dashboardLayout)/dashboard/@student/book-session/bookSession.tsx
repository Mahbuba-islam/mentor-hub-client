"use client";

import { useState } from "react";

export function BookSessionUI({ tutor }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <div className="space-y-8">

      {/* Tutor Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-2">Tutor</h2>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
            {tutor.name.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-gray-800">{tutor.name}</p>
            <p className="text-sm text-gray-500">{tutor.category?.name}</p>
          </div>
        </div>
      </div>

      {/* Select Date */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">Select a Date</h2>

        <input
          type="date"
          className="border p-2 rounded-lg"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Select Time Slot */}
      {selectedDate && (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Select a Time Slot</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-lg border transition ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Confirm Button */}
      {selectedSlot && (
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Confirm Booking
        </button>
      )}
    </div>
  );
}