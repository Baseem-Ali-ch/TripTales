import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
      return new NextResponse(null, { status: 401 });
    }

    // Verify the token
    verify(token.value, process.env.JWT_SECRET || "your-secret-key");

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    return new NextResponse(null, { status: 401 });
  }
}
