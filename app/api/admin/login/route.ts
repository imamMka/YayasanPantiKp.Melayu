import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_SECRET } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  if (!ADMIN_SECRET) {
    return NextResponse.json(
      { message: "ADMIN_SECRET environment variable is not configured." },
      { status: 500 },
    );
  }

  const body = await req.json();
  const password = body?.password;

  if (typeof password !== "string" || password !== ADMIN_SECRET) {
    return NextResponse.json({ message: "Password admin salah." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: ADMIN_SECRET,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
