import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionClient } from "../../User/getUserBySession/route";
import prisma from "@/db/database";
import { permission,user } from "@prisma/client";

export async function POST(req:NextRequest) {
    try {
        const {permission,listId,userTwo}:{permission:permission,listId:number,userTwo:user} = await req.json()
        if(!permission||!listId||!userTwo) return NextResponse.json(null,{status:400})

        const user = await GetUserBySessionClient()
        if(!user) return NextResponse.json(null,{status:400})
        await prisma.share.create({
            data:{
                userOneId:user.id,
                userTwoId:userTwo.id,
                listId:listId,
                permission:permission,
            }
        })  
        return NextResponse.json(null,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}