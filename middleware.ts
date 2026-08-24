import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'cenius-dev-4f7a2b1e9c3d5f8a'
);

const SESSION_COOKIE_NAME = 'session';

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect API write endpoints (POST, PUT, DELETE on /api/posts)
  if (pathname.startsWith('/api/posts')) {
    const method = request.method;
    if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
      const authed = await isAuthenticated(request);
      if (!authed) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/posts/:path*'],
};
