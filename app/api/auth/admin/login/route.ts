import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

const ADMIN_EMAIL = "admin@gmail.com";
const ADMIN_PASSWORD = "Admin@123";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Verify admin credentials
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "Invalid admin email" },
        { status: 401 }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin password" },
        { status: 401 }
      );
    }

    // Generate admin token
    const token = sign(
      { email, role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1d" }
    );

    // Create response
    const response = NextResponse.json(
      { message: "Admin login successful" },
      { status: 200 }
    );

    // Set admin token cookie
    response.cookies.set("admin_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
