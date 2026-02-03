"use server"

import { authClient } from "@/lib/auth-client"
import { userService } from "@/src/services/user.services"

import { redirect } from "next/navigation"

export async function logoutAction() {
  await authClient.signOut()
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
