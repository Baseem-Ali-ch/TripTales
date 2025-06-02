import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

// PATCH endpoint for updating profile
export async function PATCH(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const data = await request.json();

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        email: userData.email,
      },
      data: {
        ...(data.profilePicture && { profilePicture: data.profilePicture }),
        ...(data.coverPhoto && { coverPhoto: data.coverPhoto }),
      },
      include: {
        socialLinks: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const data = await request.json();

    // Get current user
    const user = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If changing password, verify current password
    if (data.currentPassword && data.newPassword) {
      const isValidPassword = await compare(
        data.currentPassword,
        user.password
      );

      if (!isValidPassword) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }

      // Hash new password
      const hashedPassword = await hash(data.newPassword, 12);
      data.password = hashedPassword;
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        email: userData.email,
      },
      data: {
        name: data.name,
        username: data.username,
        bio: data.bio,
        isPublic: data.publicProfile,
        ...(data.password && { password: data.password }), // Only update password if provided
        socialLinks: {
          upsert: {
            create: {
              twitter: data.twitter,
              github: data.github,
              linkedin: data.linkedin,
              instagram: data.instagram,
            },
            update: {
              twitter: data.twitter,
              github: data.github,
              linkedin: data.linkedin,
              instagram: data.instagram,
            },
          },
        },
      },
      include: {
        socialLinks: true,
      },
    });

    // Remove sensitive data before sending response
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
