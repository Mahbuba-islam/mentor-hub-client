"use server"

import { auth } from "@/lib/auth"

import { userService } from "@/src/services/user.services"

import { redirect } from "next/navigation"

// export async function logoutAction() {
//   await authClient.signOut()
//   redirect("/")   
// }

export async function logoutAction() {
  await auth.api.signOut()
  redirect("/")
}
export async function registerUserAction(data: {
  userId: string;
  name: string;
  email: string;
  role: "STUDENT" | "TUTOR";
}) {
  return await userService.registerUser(data);
}





export const getSessionAction = async () => {
  const res = await userService.getSession();

  if (res.error) {
    return {
      success: false,
      data: null,
      error: res.error,
    };
  }

  return {
    success: true,
    data: res.data,
    error: null,
  };
};