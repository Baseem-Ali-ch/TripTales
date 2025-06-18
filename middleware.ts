import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add routes that need authentication
const protectedRoutes = [
  "/profile",
  "/contact",
  "/admin",
];

// Add routes that should not be accessible when authenticated
const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/verify-email",
];

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")?.value;
  const adminToken = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  // Check if it's an admin route
  if (pathname.startsWith("/admin")) {
    if (!adminToken && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  // Check if it's an auth route (login, register, etc.)
  if (authRoutes.includes(pathname)) {
    if (authToken || role === "USER") {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
    return NextResponse.next();
  }

  // Check if it's a protected route
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!authToken && role !== "USER") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

// Configure the paths that should be matched by the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
