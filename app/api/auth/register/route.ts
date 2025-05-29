import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email";
import { randomBytes } from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, username, password } = body;

    // Check if email already exists
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // Generate verification token
    const verificationToken = randomBytes(32).toString("hex");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name: fullName,
        email: email,
        username: username,
        password: hashedPassword,
        verificationToken: verificationToken,
      },
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Remove sensitive data from response
    const {
      password: _,
      verificationToken: __,
      ...userWithoutSensitiveData
    } = user;

    return NextResponse.json(
      {
        message:
          "User registered successfully. Please check your email to verify your account.",
        user: userWithoutSensitiveData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
