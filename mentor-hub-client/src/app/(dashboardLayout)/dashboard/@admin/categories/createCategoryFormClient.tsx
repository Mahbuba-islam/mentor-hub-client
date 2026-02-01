"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategoryAction } from "@/src/app/actions/category.action";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateCategoryFormClient() {
  const [name, setName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const loadingId = toast.loading("Creating category...");

    const res = await createCategoryAction({ name });

    if (res.error) {
      toast.error(res.error, { id: loadingId });
    } else {
      toast.success("Category created!", { id: loadingId });
      setName("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 bg-white p-5 rounded-xl shadow-sm border"
    >
      <Input
        placeholder="Enter category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="w-full md:w-auto">
        Create
      </Button>
    </form>
  );
}