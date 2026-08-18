import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "togo2026";
    const adminEmail = process.env.ADMIN_EMAIL || "admin@togogrouppro.uz";

    if ((username === adminUser || username === adminEmail) && password === adminPass) {
      // Correct credentials - generate session cookie value
      const sessionValue = btoa(`${adminUser}:${adminPass}`);

      const response = NextResponse.json({ success: true });

      // Set cookie (httpOnly, secure, maxAge 1 day)
      response.cookies.set("togo_admin_session", sessionValue, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Login yoki parol xato" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
