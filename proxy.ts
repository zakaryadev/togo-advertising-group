import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["uz", "ru", "en"] as const;
const defaultLocale = "uz";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. If path starts with a locale prefix, e.g. /uz/api/settings or /uz/togo_logo.svg
  for (const locale of locales) {
    const prefix = `/${locale}`;
    if (pathname.startsWith(`${prefix}/`)) {
      const subPath = pathname.slice(prefix.length);

      // If subPath is an API route, admin route, or static file with extension, rewrite to root!
      if (
        subPath.startsWith("/api") ||
        subPath.startsWith("/admin") ||
        subPath.includes(".")
      ) {
        request.nextUrl.pathname = subPath;
        return NextResponse.rewrite(request.nextUrl);
      }
      return;
    } else if (pathname === prefix) {
      return;
    }
  }

  // 2. Direct un-prefixed API routes, Admin panel, Next internals, or static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return;
  }

  // 3. Root / -> redirect to /uz
  if (pathname === "/") {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl, 308);
  }

  // 4. Un-prefixed page routes (e.g. /aloqa) -> redirect to /uz/aloqa
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
