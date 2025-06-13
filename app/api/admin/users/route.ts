import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all users
export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("admin_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userData = await verifyToken(token);
    console.log(userData);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const users = await prisma.user.findMany();

    if (!users) {
      return NextResponse.json({ error: "Users not found" }, { status: 404 });
    }

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user data" },
      { status: 500 }
    );
  }
}

// Update user status
export async function PATCH(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("admin_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { userId, isActive } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: isActive }
    });

    return NextResponse.json({
      message: "User status updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
}

// Update user status or role
export async function PUT(request: Request) {
  try {
    console.log('PUT', request)
    const cookiesStore = await cookies();
    const token = cookiesStore.get("admin_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { userId, role } = await request.json();
    console.log(userId, role)
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Prepare update data based on what was provided
    const updateData: any = {};
    if (role !== undefined) updateData.role = role;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    return NextResponse.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// Delete user
export async function DELETE(request: Request) {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("admin_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await verifyToken(token);
    if (!userData) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Delete the user
    await prisma.user.delete({
      where: { id: userId }
    });

    return NextResponse.json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}