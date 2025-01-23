import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { GetUserBySessionServer } from "../../User/getUserBySession/route";
import prisma from "@/db/database";

export async function POST(req:NextRequest) {
    try {
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        const finishedLists = await prisma.list.findMany({
            where:{
                Finished:true
            }
        })
        return NextResponse.json(finishedLists,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}