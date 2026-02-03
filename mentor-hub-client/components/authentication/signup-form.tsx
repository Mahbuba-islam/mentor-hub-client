/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/no-children-prop */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Input } from "../ui/input";
import * as z from "zod";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { registerUserAction } from "@/src/app/actions/auth.action";

// Zod schema
const formSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["STUDENT", "TUTOR"]),
});

export function SignupForm() {
  const router = useRouter();

  const [popupType, setPopupType] = useState<"STUDENT" | "TUTOR" | null>(null);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
    },
    validators: {
      onSubmit: formSchema,
    },

    onSubmit: async ({ value }) => {
      const loadingId = toast.loading("Creating account...");

      try {
        // STEP 1 — Better Auth signup
        const { data, error } = await authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        });

        if (error) {
          toast.error(error.message, { id: loadingId });
          return;
        }

        // STEP 2 — Backend POST
       const res =  await registerUserAction({
          userId: data.user.id,
          name: value.name,
          email: value.email,
          role: value.role as "STUDENT" | "TUTOR", 
        });
console.log('user role',res);
        toast.success("Account created!", { id: loadingId });

        // STEP 3 — Popup
        setPopupType(value.role as "STUDENT" | "TUTOR");
        setOpen(true);

      } catch (err) {
        toast.error("Something went wrong", { id: loadingId });
      }
    },
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="signup-form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FieldGroup>

              {/* Name */}
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Email */}
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Password */}
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        type="password"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              {/* Role Select */}
              <form.Field
                name="role"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Select Role</FieldLabel>

                      <select
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className="border rounded-md p-2 w-full"
                      >
                        <option value="STUDENT">Student</option>
                        <option value="TUTOR">Tutor</option>
                      </select>

                      {isInvalid && <FieldError errors={field.state.meta.errors} />}
                    </Field>
                  );
                }}
              />

            </FieldGroup>
          </form>

          {/* Buttons */}
          <div className="mt-6 space-y-3">

            {/* Student Button */}
           <Button
  className="w-full font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500"
  onClick={() => {
    form.setFieldValue("role", "STUDENT");
    form.handleSubmit();                  
  }}
>
  Register as Student
</Button>

            {/* Tutor Button */}
            <Button
  className="w-full font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-600"
  onClick={() => {
    form.setFieldValue("role", "TUTOR");  
    form.handleSubmit();                   
  }}
>
  Register as Tutor
</Button>


          </div>
        </CardContent>
      </Card>

      {/* Popup */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm rounded-xl border bg-gradient-to-br from-purple-800 via-purple-500 to-pink-500 p-6 text-white shadow-2xl space-y-4">
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {popupType === "STUDENT"
              ? "Ready to start learning?"
              : "Set up your tutor profile"}
          </DialogTitle>

          <DialogDescription className="text-sm text-white/80">
            {popupType === "STUDENT"
              ? "Choose where you want to go next and begin your learning journey."
              : "Complete your profile to start teaching students on MentorHub."}
          </DialogDescription>

          <div className="flex justify-between pt-4">
            {popupType === "STUDENT" ? (
              <>
                <Button
                  className="bg-white text-purple-600 hover:bg-purple-100 font-semibold"
                  onClick={() => router.push("/")}
                >
                  Home
                </Button>
                <Button
                  className="bg-white text-pink-600 hover:bg-pink-100 font-semibold"
                  onClick={() => router.push("/tutors")}
                >
                  Browse Tutors
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-white text-purple-600 hover:bg-purple-100 font-semibold"
                  onClick={() => router.push("/")}
                >
                  Home
                </Button>
                <Button
                  className="bg-white text-purple-500 hover:bg-red-100 font-semibold"
                  onClick={() => router.push("/dashboard/profile")}
                >
                  Create Profile
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}