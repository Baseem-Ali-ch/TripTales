import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
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

    // Get page parameter from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 10;

    // Calculate skip and take values
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Fetch tags with blog count
    const [tags, total] = await Promise.all([
      prisma.tag.findMany({
        skip,
        take,
        include: {
          blogs: true,
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.tag.count()
    ]);

    // Calculate blog count for each tag
    const tagsWithBlogCount = tags.map(tag => ({
      ...tag,
      blogCount: tag.blogs.length
    }));

    return NextResponse.json({
      tags: tagsWithBlogCount,
      total,
      page,
      pageSize,
      hasMore: skip + tags.length < total
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    // Check if slug is unique
    const existingTag = await prisma.tag.findUnique({
      where: { slug: data.slug }
    });

    if (existingTag) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const tag = await prisma.tag.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        color: data.color || '#3b82f6'
      }
    });

    return NextResponse.json(tag, { status: 201 });
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
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

    const data = await request.json();

    if (!data.id || !data.name || !data.slug) {
      return NextResponse.json({ error: "ID, name, and slug are required" }, { status: 400 });
    }

    const existingTag = await prisma.tag.findUnique({
      where: { id: data.id }
    });

    if (!existingTag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    // Check if slug is unique (excluding current tag)
    const existingSlug = await prisma.tag.findFirst({
      where: {
        slug: data.slug,
        id: { not: data.id }
      }
    });

    if (existingSlug) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
    }

    const updatedTag = await prisma.tag.update({
      where: { id: data.id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description || '',
        color: data.color || '#3b82f6'
      }
    });

    return NextResponse.json(updatedTag, { status: 200 });
  } catch (error) {
    console.error("Error updating tag:", error);
    return NextResponse.json({ error: "Failed to update tag" }, { status: 500 });
  }
}

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

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const tag = await prisma.tag.findUnique({
      where: { id }
    });

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 });
    }

    await prisma.tag.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Tag deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
  }
}