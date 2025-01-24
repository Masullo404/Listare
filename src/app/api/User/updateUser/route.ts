import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../getUserBySession/functions";
import prisma from "@/db/database";

export async function PUT(req:NextRequest) {
    try {
        const {session,desc,hide}:{session:Session,desc?:string,hide?:boolean} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:401})
        if(typeof hide !== "undefined"){
            await prisma.user.update({
                where:{id:user.id},
                data:{
                    HideProfile:hide
                }
            })
            console.log('hide')
            return NextResponse.json(null,{status:200})
        }
        await prisma.user.update({
            where:{id:user.id},
            data:{
                description:desc
            }
        })
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}