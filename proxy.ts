import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminTokenValid } from "@/lib/adminAuth";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const normalizedPathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const publicAdminPaths = ["/admin", "/admin/forgot-password", "/admin/verify", "/admin/reset-password"];
  const isPublicPath = publicAdminPaths.includes(normalizedPathname) || 
                       normalizedPathname.startsWith("/admin/forgot-password/") || 
                       normalizedPathname.startsWith("/admin/verify/") || 
                       normalizedPathname.startsWith("/admin/reset-password/");

  if (isPublicPath || normalizedPathname === "/admin") {
    return NextResponse.next();
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!isAdminTokenValid(token)) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
