import { NextRequest, NextResponse } from "next/server";
import { SUPER_ADMIN_CREDENTIALS, createAdminToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (
      username === SUPER_ADMIN_CREDENTIALS.username &&
      password === SUPER_ADMIN_CREDENTIALS.password
    ) {
      const token = createAdminToken(username);

      const response = NextResponse.json(
        {
          success: true,
          message: "Authenticated as Super Admin & Root",
          user: {
            username: SUPER_ADMIN_CREDENTIALS.username,
            role: SUPER_ADMIN_CREDENTIALS.role,
          },
          token,
        },
        { status: 200 }
      );

      // Set cookie for convenience
      response.cookies.set("catalyst_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid credentials. Super Admin access restricted to authorized root account." },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Login request failed", details: error.message },
      { status: 500 }
    );
  }
}
