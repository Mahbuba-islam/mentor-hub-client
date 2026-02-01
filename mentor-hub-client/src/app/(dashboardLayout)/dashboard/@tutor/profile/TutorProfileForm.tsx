"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "sonner";
import { createTutorProfileAction, updateTutorProfileAction } from "@/src/app/actions/tutorDashboard.action";

// Form fields type
type TutorProfileFormType = {
  bio: string;
  price: number;
  categoryId: string;
  subjects: string;
  experience?: string;
};

// Component props type
type TutorProfileFormProps = {
  categories: any;
  defaultValues?: Partial<TutorProfileFormType>;
  isUpdate?: boolean;
  onCancel?: () => void;
};

export function TutorProfileForm({
  categories,
  defaultValues,
  isUpdate,
  onCancel
}: TutorProfileFormProps) {

  const { register, handleSubmit, reset } = useForm<TutorProfileFormType>({
    defaultValues: defaultValues || {}
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: TutorProfileFormType) => {
   const payload = {
  ...values,
  price: Number(values.price),
  subject: values.subjects.split(",").map((s) => s.trim()), 
};


    startTransition(async () => {
      const res = isUpdate
        ? await updateTutorProfileAction(payload)
        : await createTutorProfileAction(payload);

      if (res?.success) {
        toast.success(isUpdate ? "Profile updated" : "Profile created");
        reset();
        if (onCancel) onCancel();
      } else {
        toast.error(res?.message || "Failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-xl shadow">
      {/* Bio */}
      <div>
        <label className="block font-medium mb-1">Bio</label>
        <textarea {...register("bio", { required: true })} className="w-full border rounded-md p-2" rows={4} />
      </div>

      {/* Price */}
      <div>
        <label className="block font-medium mb-1">Hourly Price ($)</label>
        <input type="number" {...register("price", { required: true })} className="w-full border rounded-md p-2" />
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium mb-1">Category</label>
        <select {...register("categoryId", { required: true })} className="w-full border rounded-md p-2">
          <option value="">Select category</option>
          {categories.data?.map((cat: any) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Subjects */}
      <div>
        <label className="block font-medium mb-1">Subjects (comma separated)</label>
        <input type="text" {...register("subjects", { required: true })} className="w-full border rounded-md p-2" />
      </div>

      {/* Experience */}
      <div>
        <label className="block font-medium mb-1">Experience (optional)</label>
        <textarea {...register("experience")} className="w-full border rounded-md p-2" rows={3} />
      </div>

      <button type="submit" disabled={isPending} className="w-full bg-primary text-white py-2 rounded-md font-semibold">
        {isPending ? (isUpdate ? "Updating..." : "Creating...") : (isUpdate ? "Update Profile" : "Create Profile")}
      </button>

      {isUpdate && (
        <button type="button" onClick={onCancel} className="w-full bg-gray-300 py-2 rounded-md mt-2">
          Cancel
        </button>
      )}
    </form>
  );
}