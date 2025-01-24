import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../../User/getUserBySession/functions";
import prisma from "@/db/database";

export async function POST(req:NextRequest) {
    try{
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        const importLists = await prisma.list.findMany({
            where:{
                priority:"HIGH",
                userId:user.id
            }
        })
        if(!importLists) return NextResponse.json(null,{status:400})
        return NextResponse.json(importLists,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}