import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//* Endpoint to handle user email verification
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { VerificationToken, email } = body;
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Verification token is required" },
        { status: 400 }
      );
    }

    if (VerificationToken !== token) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required for verification" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email as string },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const updatedUser = await prisma.user.update({
      where: { email: email as string },
      data: { verified: true },
    });

    return NextResponse.json(
      {
        message:
          "Email verified successfully. You can now log in with your credentials.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("api/auth/verify-email: Email verification error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
