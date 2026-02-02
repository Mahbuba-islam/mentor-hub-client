import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getServerUser() {
  const h = headers();

  const session = await auth.api.getSession({
    headers: Object.fromEntries(h), 
  });

  return session?.user || null;
}