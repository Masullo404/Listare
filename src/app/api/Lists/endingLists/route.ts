import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../../User/getUserBySession/route";
import prisma from "@/db/database";

export async function POST(req:NextRequest) {
    try {
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        const endingLists = await prisma.list.findMany({
            where:{
                userId:user.id,
                Finished:false
            }
        })
        endingLists.sort((a,b) => Number(a.Deadline.split('-')[1]) - Number(b.Deadline.split('-')[1]))
        endingLists.sort((a,b)=>Number(a.Deadline.split('-')[2])-Number(b.Deadline.split('-')[2]))
        return NextResponse.json(endingLists,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}