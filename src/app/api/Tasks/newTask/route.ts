import prisma from "@/db/database";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionServer } from "../../User/getUserBySession/functions";
import { Session } from "next-auth";

export async function POST(req:NextRequest) {
    try {
        const {session,name,listId}:{session:Session,name:string,listId:number} = await req.json()
        if(!session||!name||!listId) return NextResponse.json(null,{status:400})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        await prisma.task.create({
            data:{
                name:name,
                listId:Number(listId),
                userId:user.id,
                situation:"UNFINISHED"
            }
        })
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}
export async function PUT(req:NextRequest) {
    try {
        const {name,session,newName}:{newName?:string,name:string,session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user||!name) return NextResponse.json(null,{status:400})
        if(newName){
            await prisma.task.update({
                where:{
                    name_userId:{
                        name:name,
                        userId:user.id    
                    }
                },
                data:{
                    name:newName
                }
            })
            return NextResponse.json(null,{status:200})
        }
        await prisma.task.update({
            where:{
                name_userId:{
                    name:name,
                    userId:user.id    
                }
            },
            data:{
                situation:"FINISHED"
            }
        })
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}
export async function DELETE(req:NextRequest) {
    try {
        const {name,session}:{name:string,session:Session} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user||!name) return NextResponse.json(null,{status:400})
        await prisma.task.delete({
            where:{
                name_userId:{
                    name:name,
                    userId:user.id
                }
            }
        })
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}