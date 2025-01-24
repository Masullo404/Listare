import prisma from "@/db/database"
import { Session } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { GetUserBySessionServer } from "../../User/getUserBySession/functions"
import { list } from "@prisma/client"

export async function POST(req:NextRequest) {
    try {
        const {session,allshares}:{session:Session,allshares?:boolean} = await req.json()
        if(!session) return NextResponse.json(null,{status:401})
        const user = await GetUserBySessionServer(session)
        if(!user) return NextResponse.json(null,{status:400})
        if(allshares){
            const sharedWithMeLists = await prisma.share.findMany({
                where:{
                    userTwoId:user.id
                },
                select:{
                    list:true
                }
            })
            const sharedWithOther = await prisma.share.findMany({
                where:{
                    userOneId:user.id
                },
                select:{
                    list:true
                }
            })    
            const result:list[] = []
            sharedWithMeLists.forEach(share => result.push(share.list))
            sharedWithOther.forEach(share => result.push(share.list))
            return NextResponse.json(result,{status:200})
        }
        const sharedWithMeLists = await prisma.share.findMany({
            where:{
                userTwoId:user.id
            },
            select:{
                list:true
            }
        })
        return NextResponse.json(sharedWithMeLists,{status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}

