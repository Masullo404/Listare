import prisma from "@/db/database"
import { getServerSession, Session } from "next-auth"
import options from "../../auth/[...nextauth]/options"

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