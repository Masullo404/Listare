import options from "@/app/api/auth/[...nextauth]/options"
import { user } from "@prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"


export default async function Friends() {
    const url = process.env.NEXTAUTH_URL
    const session = await getServerSession(options)
    const response = await fetch(url+'/api/User/friends',{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify({session:session})
    })
    if(!response.ok){
        return(
            <>
                <p className="h4">No Friends Yet</p>
            </>
        )
    }
    const friends:user[] = await response.json()
    return(
        <>
            { (friends && friends.length>0)?
            (
                friends.map(friend => (
                    <Link key={friend.id} href={`/dashboard/social/friends/${friend.id}`} className="text-decoration-none text-white">{friend.name}</Link>
                ))
            )
            :
            (
                <p className="h4">No Friends Yet</p>
            )
            }
        </>
    )
}