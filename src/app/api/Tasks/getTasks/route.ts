import prisma from "@/db/database";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../../User/getUserBySession/functions";

export async function POST(req:NextRequest){
    try {
        const {listId,session}:{session:Session,listId:string} = await req.json()
        if(!listId||!session) return NextResponse.json(null,{status:400})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        const List = await prisma.list.findUnique({
            where:{
                id:Number(listId),
                userId:user.id
            },
            include:{
                tasks:true
            }
        })
        return NextResponse.json(List,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}