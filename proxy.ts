import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths that are excluded from authentication checks
  const isLoginPath = pathname.endsWith("/admin/login") || pathname.includes("/api/admin/login");

  // Determine if path belongs to admin panel or admin api
  const isAdminPath = (pathname.match(/^\/(?:[a-z]{2}\/)?admin/) || pathname.startsWith("/api/admin")) && !isLoginPath;

  if (isAdminPath) {
    // Check for session cookie
    const sessionCookie = request.cookies.get("togo_admin_session")?.value;

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "togo2026";
    const expectedSession = btoa(`${adminUser}:${adminPass}`);

    if (sessionCookie === expectedSession) {
      // Authenticated successfully
      return NextResponse.next();
    }

    // Not authenticated
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    // Redirect to login page preserving current locale
    const localeMatch = pathname.match(/^\/([a-z]{2})\b/);
    const locale = localeMatch ? localeMatch[1] : "uz";

    const redirectUrl = new URL(`/${locale}/admin/login`, request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match admin panel routes and api routes
    "/admin",
    "/:locale/admin",
    "/api/admin/:path*",
  ],
};
