// Middleware for route protection
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Protected routes that require authentication
  const isProtectedRoute = nextUrl.pathname.startsWith('/wishlist');

  if (isProtectedRoute && !isLoggedIn) {
    // Redirect to sign-in page if trying to access protected route
    return NextResponse.redirect(new URL('/auth/signin', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
