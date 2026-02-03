"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useState, useEffect } from "react";
import { updateStudentProfileAction } from "@/src/app/actions/userDashboard.action";

export default function UpdateProfileModal({ open, onClose, profile, onUpdated }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // ⭐ Reset state when modal opens
  useEffect(() => {
    if (open && profile) {
      setName(profile.name || "");
      setPhone(profile.phone || "");
    }
  }, [open, profile]);

  const handleSubmit = async () => {
    const res = await updateStudentProfileAction({ name, phone });

    if (res?.success && res.data) {
      onUpdated(res.data); // ⭐ send updated profile to parent
      onClose();            // ⭐ close modal
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <Dialog.Content
          className="fixed z-50 top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl 
          w-full max-w-sm space-y-4 shadow-lg"
        >
          <VisuallyHidden>
            <Dialog.Title>Update Profile</Dialog.Title>
          </VisuallyHidden>

          <h2 className="text-xl font-semibold">Update Profile</h2>

          <div className="space-y-3">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                className="w-full border rounded-md p-2 mt-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                className="w-full border rounded-md p-2 mt-1"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}