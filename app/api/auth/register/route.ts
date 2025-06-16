import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { sendVerificationEmail } from "@/lib/email";

const prisma = new PrismaClient();

//* Endpoint to handle user registration
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, username, password } = body;

    //* Ensure email is unique
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "Email is already exists" }),
        {
          status: 400,
        }
      );
    }

    //* Ensure username is unique
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        {
          status: 400,
        }
      );
    }

    const verificationToken = randomBytes(32).toString("hex");

    // TODO: Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        username,
        password: hashedPassword,
        status: "ACTIVE",
        role: "USER",
        verified: false,
        public: true,
      },
    });

    await sendVerificationEmail(newUser.email, verificationToken);

    return NextResponse.json(
      {
        verificationToken,
        email,
        message: "User registered successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("api/auth/register: Error during registration:", error);
    return NextResponse.json(
      { error: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
