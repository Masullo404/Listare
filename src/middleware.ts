import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req:NextRequest) {
    try{
        const token = await getToken({req,secret:process.env.JWT_SECRET})
        if(!token){
            const url = process.env.NEXTAUTH_URL
            return NextResponse.redirect(`${url}`)
        }
        return NextResponse.next()
    }catch(err){
        console.log(err)
        const url = process.env.NEXTAUTH_URL
        return NextResponse.redirect(`${url}`)
    }
}

export const config = {
    matcher:['/dashboard/:path*']
}