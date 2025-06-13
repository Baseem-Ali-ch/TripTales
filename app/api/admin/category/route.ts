import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all categories
export async function GET(request: Request) {
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

        // Get page parameter from URL
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const pageSize = 10; // Number of items per page

        // Calculate skip and take values
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        // Fetch categories with blog count
        const [categories, total] = await Promise.all([
            prisma.category.findMany({
                skip,
                take,
                include: {
                    blogs: true,
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.category.count()
        ]);

        // Calculate blog count for each category
        const categoriesWithBlogCount = categories.map(category => ({
            ...category,
            blogCount: category.blogs.length
        }));

        return NextResponse.json({
            categories: categoriesWithBlogCount,
            total,
            page,
            pageSize,
            hasMore: skip + categories.length < total
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching categories:", error);
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
        console.log(userData);
        if (!userData) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { name, slug, description, color } = await request.json();

        if (!name || !slug || !description || !color) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const slugExists = await prisma.category.findUnique({
            where: { slug },
        });

        if (slugExists) {
            return NextResponse.json({ error: "Category slug already exists" }, { status: 400 });
        }

        const category = await prisma.category.create({
            data: { name, slug, description, color },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
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
        console.log(userData);
        if (!userData) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const { id, name, slug, description, color } = await request.json();

        if (!id || !name || !slug || !description || !color) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const category = await prisma.category.update({
            where: { id: id },
            data: { name, slug, description, color },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const cookiesStore = await cookies()
        const token = cookiesStore.get("admin_auth_token")?.value
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
        const userData = await verifyToken(token);
        console.log(userData);
        if (!userData) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 })
        }

        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
        }

        const category = await prisma.category.delete({
            where: { id: id },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}