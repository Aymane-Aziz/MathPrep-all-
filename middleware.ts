import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of public paths that don't require authentication
const publicPaths = ["/", "/landing", "/login", "/register", "/forgot-password"]

// List of API paths that don't require authentication
const publicApiPaths = ["/api/auth/login", "/api/auth/register", "/api/auth/reset-password"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is in the public paths list
  const isPublicPath =
    publicPaths.includes(pathname) ||
    publicApiPaths.some((path) => pathname.startsWith(path)) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/assets/")

  // Get the token from cookies
  const token = request.cookies.get("mathworld_token")?.value

  // If the path is not public and there's no token, redirect to the landing page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/landing", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
