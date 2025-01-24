import { NextRequest, NextResponse } from "next/server";
import { GetUserBySessionClient } from "../../User/getUserBySession/functions";
import { priority, user } from "@prisma/client";
import prisma from "@/db/database";

export async function POST(req:NextRequest) {
    try {
        const user:user|null = await GetUserBySessionClient()
        if(!user) return NextResponse.json(null,{status:400})
        const {name,priority,tag,maxDate}:{name:string|undefined,priority:priority|undefined,tag:string|undefined,maxDate:string|undefined} = await req.json()
        let lists = await prisma.list.findMany({
            where:{
                userId:user.id,
                Finished:false
            }
        })
        if(!lists) return NextResponse.json(null,{status:500})
        if(name){
           lists = lists.filter(list => list.name.includes(name))
        }
        if(priority){
            lists = lists.filter(list => list.priority === priority)
        }
        if(tag){
            lists = lists.filter(list => list.tags.includes(tag))
        }
        if(maxDate){
            lists = lists.filter(list => Number(list.Deadline.split('-')[1]) < Number(maxDate.split('-')[1]))
            lists = lists.filter(list => Number(list.Deadline.split('-')[2]) < Number(maxDate.split('-')[2]))
        }
        return NextResponse.json(lists,{status:200})

    } catch (error) {
        console.log(error)
        return NextResponse.json(null,{status:500})
    }
}