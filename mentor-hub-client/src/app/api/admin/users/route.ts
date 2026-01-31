import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const backendRes = await fetch("http://localhost:5000/admin/getAllUsers", {
    method: "GET",
    // ⭐⭐ THIS IS THE FIX ⭐⭐
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
    cache: "no-store",
  })

  const data = await backendRes.json()

  console.log("🔥 BACKEND RAW RESPONSE:", data)

  return NextResponse.json(data)
}