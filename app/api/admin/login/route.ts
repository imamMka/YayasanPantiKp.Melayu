import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_SECRET } from "@/lib/adminAuth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  // Fetch latest settings from database
  let settings = await prisma.settings.findFirst({
    where: { id: 1 }
  });

  // Fallback to default if not exists
  if (!settings) {
    settings = {
      adminUsername: process.env.ADMIN_USERNAME || "admin",
      adminSecret: process.env.ADMIN_SECRET || "admin123",
      recoveryEmail: null,
      id: 1,
      updatedAt: new Date()
    };
  }

  const body = await req.json();
  const username = body?.username;
  const password = body?.password;

  if (
    typeof username !== "string" || 
    typeof password !== "string" || 
    username !== settings.adminUsername || 
    password !== settings.adminSecret
  ) {
    return NextResponse.json({ message: "Username atau Password admin salah." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: ADMIN_SECRET, // Use the static secret for middleware validation
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return response;
}
