import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const locales = ["uz", "ru", "en"] as const;
const defaultLocale = "uz";

// Refreshes the Supabase auth token (if expired) and re-writes it into the
// response cookies. Without this, admin sessions never refresh outside of an
// /api/admin request, so the JWT silently expires mid-use and admin pages
// start failing with 401s until the user manually logs out and back in.
async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!isSupabaseConfigured()) {
    return response;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export async function proxy(request: NextRequest) {
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

  // 2. Admin panel routes: refresh the Supabase session before rendering
  if (pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  // 3. Direct un-prefixed API routes, Next internals, or static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return;
  }

  // 4. Root / -> redirect to /uz
  if (pathname === "/") {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl, 308);
  }

  // 5. Un-prefixed page routes (e.g. /aloqa) -> redirect to /uz/aloqa
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl, 308);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
