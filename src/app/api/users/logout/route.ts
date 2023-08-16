import { NextResponse } from "next/server";


export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout successfully!", success: true })
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })
        return response
    } catch (error: any) {
        console.log("🚀 ~ file: route.ts:9 ~ GET ~ error:", error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
} 