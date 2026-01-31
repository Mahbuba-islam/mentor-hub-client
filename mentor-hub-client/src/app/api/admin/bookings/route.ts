import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const backendRes = await fetch("http://localhost:5000/admin/bookings", {
      method: "GET",
      headers: {
        // ⭐ Cookie forward — MOST IMPORTANT
        Cookie: req.headers.get("cookie") || "",
      },
      cache: "no-store",
    })

    const data = await backendRes.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin Bookings Error:", error)
    return NextResponse.json(
      { error: "Failed to load admin bookings" },
      { status: 500 }
    )
  }
}