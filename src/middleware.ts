import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {


    const path = request.nextUrl.pathname
    const isPublicPath = ["/login", "/signup", "/verifyemail"].includes(path)
    const token = request.cookies.get("token")?.value || ""

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/", request.nextUrl))
    } else if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl))
    }
}

export const config = { matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"] }