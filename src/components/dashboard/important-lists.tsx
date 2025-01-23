import options from "@/app/api/auth/[...nextauth]/options"
import { list } from "@prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function ImportantLists(){
    const session = await getServerSession(options)
    const url = process.env.NEXTAUTH_URL
    const response = await fetch(url+"/api/Lists/importantLists",{
        method:'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        body:JSON.stringify({session:session})
    })
    if(!response.ok){
        return(
            <>
                <p className="h5">Error Loading your important lists</p>
            </>
        )
    }
    const importantList:list[] = await response.json()
    return(
        <>{ (importantList && importantList.length > 0)?
        (importantList.map(list => (
            <Link key={list.id} href={`dashboard/lists/${list.id}`} className="text-decoration-none text-white">
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