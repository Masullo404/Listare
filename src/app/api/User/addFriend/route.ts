import prisma from "@/db/database";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionClient } from "../getUserBySession/functions";

export async function POST(req:NextRequest) {
    try {
        const {scode}:{scode:string} = await req.json()
        if(!scode) return NextResponse.json(null,{status:400})
        const user = await GetUserBySessionClient()
        if(!user) return NextResponse.json(null,{status:400})
        const friendTwo = await prisma.user.findUnique({
            where:{
                Scode:scode
            }
        })
        if(!friendTwo) return NextResponse.json(null,{status:400})
        await prisma.friend.create({
            data:{
                friendOne:user.id,
                friendTwo:friendTwo.id
            }
        })
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}