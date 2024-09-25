import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET_KEY = process.env.JWT_SECRET_KEY
if (!SECRET_KEY) {
    throw new Error('JWT_SECRET_KEY is not set')
}

const protectedPathRegex = /^\/dashboard($|\/)/

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isProtectedRoute = protectedPathRegex.test(path)

    if (!isProtectedRoute) {
        return NextResponse.next()
    }

    const token = request.cookies.get('token')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
        return NextResponse.next()
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}