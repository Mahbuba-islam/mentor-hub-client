
"use server";

import { adminService } from "@/src/services/admin.services";

// import { getServerSession } from "next-auth";

// get all users
export const getUsersAction = async () => {
  return await adminService.getAllUsers();
};





export async function setActiveAction(userId: string) {
 await adminService.manageUserStatus(userId, "ACTIVE");
}

export async function setBanAction(userId: string) {
  await adminService.manageUserStatus(userId, "BANNED");
}


