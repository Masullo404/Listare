import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req:NextRequest) {
        const token = await getToken({req,secret:process.env.JWT_SECRET})
        if(!token){
            const url = process.env.NEXTAUTH_URL
            return NextResponse.redirect(url+"/")
        }
        return NextResponse.next()
}

export const config = {
    matcher:['/dashboard/:path*']
}