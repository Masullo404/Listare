import options from "@/app/api/auth/[...nextauth]/options"
import { list } from "@prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function RecentLists(){
    const session = await getServerSession(options)
    const url = process.env.NEXTAUTH_URL
    const response = await fetch(url+'/api/Lists/recentLists',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({session:session})
    })    
    if(!response.ok){
        return(
            <>
                <p className="h5">Failed To Load Recent Lists</p>
            </>
        )
    }
    const recentLists:list[] = await response.json()
    return(
        <>
            { (recentLists && recentLists.length > 0)?
        (recentLists.map(list => (
            <Link key={list.id} href={`/dashboard/lists/${list.id}`} className="text-decoration-none text-white">
                    {list.name}
            </Link>
        )))
        :
        (
            <>
            <p className="h5">No Lists Yet.</p>
            </>
        )
        }
        </>
    )
}