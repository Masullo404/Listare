import prisma from "@/db/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        const {scode}:{scode:string} = await req.json()
        if(!scode) return NextResponse.json(null,{status:400})
        const user = await prisma.user.findUnique({
            where:{
                Scode:scode
            }
        })
        if(!user) return NextResponse.json(null,{status:400})
        return NextResponse.json(user,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}