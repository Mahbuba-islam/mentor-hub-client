// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import { createCategoryAction } from "@/src/app/actions/category.action";

// export default function CreateCategoryFormClient() {
//   const [bio, setBio] = useState("");
//   const [category, setCategory] = useState("");
//   const [subjects, setSubjects] = useState("");
//   const [price, setPrice] = useState("");

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const loadingId = toast.loading("Creating tutor profile...");

//     const res = await createCategoryAction({
//       bio,
//       category,
//       subjects: subjects.split(",").map((s) => s.trim()),
//       price,
//     });

//     if (res.error) {
//       toast.error(res.error, { id: loadingId });
//     } else {
//       toast.success("Tutor created successfully!", { id: loadingId });
//       setBio("");
//       setCategory("");
//       setSubjects("");
//       setPrice("");
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="space-y-6 bg-white p-6 rounded-xl shadow-md border"
//     >
//       {/* BIO — FULL WIDTH */}
//       <div className="space-y-2">
//         <label className="font-semibold text-gray-800">Bio</label>
//         <Textarea
//           placeholder="Write a short professional bio..."
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//           className="min-h-[100px]"
//         />
//       </div>

//       {/* CATEGORY + SUBJECTS + PRICE — ONE LINE */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//         {/* Category */}
//         <div className="space-y-2">
//           <label className="font-semibold text-gray-800">Category</label>
//           <Input
//             placeholder="e.g. STEM"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />
//         </div>

//         {/* Subjects */}
//         <div className="space-y-2">
//           <label className="font-semibold text-gray-800">Subjects</label>
//           <Input
//             placeholder="e.g. Math, Physics"
//             value={subjects}
//             onChange={(e) => setSubjects(e.target.value)}
//           />
//         </div>

//         {/* Hourly Price */}
//         <div className="space-y-2">
//           <label className="font-semibold text-gray-800">Hourly Price ($)</label>
//           <Input
//             type="number"
//             placeholder="e.g. 40"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>

//       </div>

//       {/* SUBMIT BUTTON */}
//       <Button
//         type="submit"
//         className="w-full bg-gradient-to-r from-[#5624D0] to-[#b00ea5] text-white font-semibold"
//       >
//         Create Tutor
//       </Button>
//     </form>
//   );
// }



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createCategoryAction } from "@/src/app/actions/category.action";

export default function CreateCategoryFormClient() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const loadingId = toast.loading("Creating category...");

    const res = await createCategoryAction({ name });

    if (res?.error) {
      toast.error(res.error, { id: loadingId });
    } else {
      toast.success("Category created successfully!", { id: loadingId });
      setName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-xl shadow-md border"
    >
      {/* CATEGORY NAME */}
      <div className="space-y-2">
        <label className="font-semibold text-gray-800">Category Name</label>
        <Input
          placeholder="e.g. STEM, Language, Arts"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        type="submit"
        className="w-full bg-linear-to-r from-[#5624D0] to-[#b00ea5] text-white font-semibold"
      >
        Create Category
      </Button>
    </form>
  );
}