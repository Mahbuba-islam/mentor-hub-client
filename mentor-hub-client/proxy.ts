// import { NextRequest, NextResponse } from "next/server";
// import { userService } from "./src/services/user.services";
// import { Roles } from "./src/constants/roles";

// export async function proxy(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   let isAuthenticated = false;
//   let isAdmin = false;

//   // Load session from BetterAuth
//   const session = await userService.getSession();
//   const user = session?.data?.user;

//   if (user) {
//     isAuthenticated = true;
//     isAdmin = user.role === Roles.ADMIN;
//   }

//   // 1) Not logged in → redirect to login
//   if (!isAuthenticated) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   // 2) Admin trying to access student/tutor dashboard
//   if (isAdmin && pathname.startsWith("/dashboard")) {
//     return NextResponse.redirect(new URL("/admin-dashboard", request.url));
//   }

//   // 3) Student/Tutor trying to access admin dashboard
//   if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Allow request to continue
//   return NextResponse.next();
// }

// export const config = {
//  matcher: [
//   "/dashboard",
//   "/dashboard/:path*",
// ],

// };



import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./src/constants/roles";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1️⃣ Fetch session from internal API route (same-origin)
  const res = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    cache: "no-store",
    credentials: "include", // include cookies
  });

  const sessionData = await res.json();
  const user = sessionData?.user;

  // 2️⃣ Not logged in → redirect to login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdmin = user.role === Roles.ADMIN;

  // 3️⃣ Admin trying to access student/tutor dashboard
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // 4️⃣ Student/Tutor trying to access admin dashboard
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5️⃣ Allow request to continue
  return NextResponse.next();
}

// 6️⃣ Protect all dashboard and admin routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard/:path*",
  ],
};
