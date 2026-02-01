
// export function TutorProfileView({ profile, categories } : {profile:TutorProfile, categories:Category}) {
//   const [isEditing, setIsEditing] = useState(false);

 "use client";

import { useState } from "react";
import { TutorProfileForm } from "./TutorProfileForm";
import { TutorProfile } from "@/src/types/tutor.types";
import { Category } from "@/src/types/category.types";

export function TutorProfileView({ profile, categories } : {profile:TutorProfile, categories:Category}) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <TutorProfileForm
        categories={{ data: categories }}
        defaultValues={{
          bio: profile.bio,
          price: profile.price,
          categoryId: profile.categoryId,
          subjects: profile.subject.join(", "),
          experience: profile.experience || "",
        }}
        isUpdate
        onCancel={() => setIsEditing(false)}   // 🔥 FIX
      />
    );
  }

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl shadow">
      <p><strong>Name:</strong> {profile.user?.name}</p>
      <p><strong>Email:</strong> {profile.user?.email}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Price:</strong> ${profile.price}</p>
      <p><strong>Category:</strong> {profile.category?.name}</p>
      <p><strong>Subjects:</strong> {profile.subject.join(", ")}</p>

      <button
        onClick={() => setIsEditing(true)}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Update Profile
      </button>
    </div>
  );
}