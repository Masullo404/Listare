import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req:NextRequest) {
    try{
        const token = await getToken({req,secret:process.env.JWT_SECRET})
        if(!token){
            return NextResponse.redirect(new URL("/api/auth/signin",req.url))
        }
        return NextResponse.next()
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}

export const config = {
    matcher:['/dashboard/:path*']
}