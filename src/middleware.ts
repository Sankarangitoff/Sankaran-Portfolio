import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-change-me')

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get('admin_token')?.value
  if (!token) return false
  try {
    await jwtVerify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Add header for admin routes so layout can detect it
  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    response.headers.set('x-is-admin', 'true')

    // Allow login page without auth
    if (pathname === '/admin/login') {
      return response
    }

    // Protect all other admin pages
    const authed = await isAuthenticated(request)
    if (!authed) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  // Protect admin API routes (except login)
  if (pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')) {
    const authed = await isAuthenticated(request)
    if (!authed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
