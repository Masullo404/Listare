import prisma from "@/db/database";
import { priority } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {  GetUserBySessionClient, GetUserBySessionServer } from "../../User/getUserBySession/functions";
import { Session } from "next-auth";

export async function POST(req:NextRequest) {
    try{
        const body = await req.json()
        if(!body) return NextResponse.json(null,{status:400,statusText:"The req.body must be form data"})

        const {name,priority,tags,deadline}:{name:string,priority:priority,tags:string,deadline:string} = body
        const user = await GetUserBySessionClient()

        if(!name || !priority || !tags || !deadline || !user) {
            return NextResponse.json(null,{status:400}) 
        }
       await prisma.list.create({
         data:{
            userId:user.id,
            name:name,
            priority:priority,
            Deadline:deadline,
            tags:tags
         }   
        })
        return NextResponse.json(null,{status:200})
    }catch(err){
        console.log(`${err}`)
        return NextResponse.json(null,{status:500,statusText:"An Error ocurred while creating the list"})
    }
}
export async function PUT(req:NextRequest) {
    try {
        const {session,name}:{session:Session,name:string} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user||!name) return NextResponse.json(null,{status:400})
        await prisma.list.update({
            data:{
                Finished:true
            },
            where:{
                name_userId:{
                    userId:user.id,
                    name:name
                }
            }
        })
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}