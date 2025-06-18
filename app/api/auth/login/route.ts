import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

//* Endpoint to handle user login
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Check if email exists
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log('user', user)
    if (!user) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check if email is verified
    if (!user.verified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 400 }
      );
    }

    // Verify password
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    if (!user.status || user.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Your account is not active. Please contact admin" },
        { status: 400 }
      );
    }

    //* Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Generate JWT token
    const token = sign(
      {
        userId: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Create the response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user,
      },
      { status: 200 }
    );

    //* Set the token in an HTTP-only cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });
    response.cookies.set('role', user.role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 // 24 hours
  })

    return response;
  } catch (error) {
    console.error("api/auth/login: Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong during login, Please try again." },
      { status: 500 }
    );
  }
}
