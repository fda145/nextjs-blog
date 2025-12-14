import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  const protectedPaths = ['/dashboard', '/posts/new'];
  const isProtectedPath = protectedPaths.some(p => path.startsWith(p));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/posts/new'],
};
