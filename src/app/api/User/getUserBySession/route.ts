import { NextResponse } from "next/server";
import prisma from "@/db/database";
import { getServerSession } from "next-auth";
import options from "../../auth/[...nextauth]/options";
import {  Session } from "next-auth"

export async function GET() {
    try{
        const session = await getServerSession(options)
        if(!session || !session.user) {
            console.log('Session not found')
            return NextResponse.json(null,{status:401})
        }
        const user = await prisma.user.findUnique({
            where:{
                email:String(session.user.email)
            }
        })
        if(!user) return NextResponse.json(null,{status:404})
        return NextResponse.json(user,{status:200})
    }catch(err){
        console.log(err)
        return NextResponse.json(null,{status:500})
    }
}

export async function GetUserBySessionClient() {
    const session = await getServerSession(options)
    if(!session) return null
    const user = await prisma.user.findUnique({
        where:{
            email:String(session.user.email)
        }
    })
    return user
}
export async function GetUserBySessionServer(session:Session){
    if(!session) return null
    const user = await prisma.user.findUnique({
        where:{
            email:String(session.user.email)
        }
    })
    return user
}