import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../getUserBySession/functions";
import prisma from "@/db/database";
import { user } from "@prisma/client";

export async function POST(req:NextRequest) {
    try {
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        const result:user[]  = []
        const friendOne = await prisma.friend.findMany({
            where:{
                friendOne:user.id
            },
            include:{
                friendTwoRelation:true
            },
        })
        const friendTwo = await prisma.friend.findMany({
            where:{
                friendTwo:user.id
            },
            include:{
                friendOneRelation:true
            }
        })
        friendOne.forEach( item => result.push(item.friendTwoRelation) )
        friendTwo.forEach( item => result.push(item.friendOneRelation) )

        if(!result) return NextResponse.json(null,{status:204})
        return NextResponse.json(result,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}