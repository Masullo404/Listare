import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req:NextRequest) {
    try{
        if(req.nextUrl.pathname.includes('/dashboard')){
            setTimeout(async()=>{
                const url = process.env.NEXTAUTH_URL
                const sessionResponse = await fetch(url+'/api/User/getUserBySession')
                const authenticatedUser = await sessionResponse.json()
                if(!authenticatedUser){
                    console.log("redirecting")
                    return NextResponse.redirect(new URL('/api/auth/signin',req.url))
                }
                return NextResponse.next()
            },500)
        }
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}
export const config = {
    matcher:['/dashboard/:path*']
}