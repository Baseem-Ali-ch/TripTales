import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";

const prisma = new PrismaClient();

//* GET endpoint for fetching user profile
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
        id: userData.userId,
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

//* PATCH endpoint for updating profile
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

//* PUT endpoint for updating user profile with more fields
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

    const body = await request.json();

    const data = body;
    console.log("dat", data);
    // Get current user
    const user = await prisma.user.findUnique({
      where: { id: userData.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //* If changing password, verify current password
    if (data?.currentPassword && data?.newPassword) {
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
      const hashedPassword = await hash(data.newPassword, 10);
      data.password = hashedPassword;
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: {
        id: userData.userId,
      },
      data: {
        fullName: data.fullName,
        username: data.username,
        bio: data.bio,
        public: data.publicProfile,
        ...(data.password && { password: data.password }),
        socialLinks: {
          upsert: {
            where: {
              userId: userData.userId, // Specify where condition for the upsert
            },
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

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
