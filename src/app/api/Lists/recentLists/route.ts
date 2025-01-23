import { NextRequest, NextResponse } from "next/server"
import prisma from "@/db/database"
import {  Session } from "next-auth"
import { GetUserBySessionServer } from "../../User/getUserBySession/route"

export async function POST(req:NextRequest) {
    try{
        const {session}:{session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        const recentLists = await prisma.list.findMany({
            where:{
                userId:user.id
            },
            orderBy:{
                CreatedAt:"asc"
            }
        })
        if(!recentLists) return NextResponse.json(null,{status:500})
        return NextResponse.json(recentLists,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}