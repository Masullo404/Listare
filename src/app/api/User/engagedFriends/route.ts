import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../getUserBySession/route";
import prisma from "@/db/database";
import { user } from "@prisma/client";

export async function POST(req:NextRequest) {
    try {
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:401})
        const shareOne = await prisma.share.findMany({
            where:{
                userOneId:user.id
            },
            include:{
                userTwo:true
            }
        })
        const shareTwo = await prisma.share.findMany({
            where:{
                userTwoId:user.id
            },
            include:{
                userOne:true
            }
        })
        const result:user[] = []
        shareOne.forEach(share => result.push(share.userTwo))
        shareTwo.forEach(share => result.push(share.userOne))
        return NextResponse.json(result,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}