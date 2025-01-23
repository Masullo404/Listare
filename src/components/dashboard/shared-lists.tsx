import options from "@/app/api/auth/[...nextauth]/options"
import { list } from "@prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"

export default async function SharedLists() {
    const session = await getServerSession(options)
    const url = process.env.NEXTAUTH_URL
    const response = await fetch(url+"/api/Lists/sharedWithMe",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session})
    })
    if(!response.ok){
        return(
            <>
                <div className="alert alert-secondary">
                    Nobody has shared lists with you.
                </div>
            </>
        )
    }
    const sharedWithMe:{list:list}[] = await response.json()
    return(
        <>
        { (sharedWithMe.length === 0)?
        (
            <div className="alert alert-secondary">
                    Nobody has shared lists with you.
            </div>
        )
        :
        (
        <div className="bg-white d-flex p-3 w-100">
            { sharedWithMe && sharedWithMe.slice(0,3).map(({list}) =>(
                <div key={list.id} className="d-flex flex-column bg-light rounde p-3">
                    <p className="h3">{list.name}</p>
                    <span className={list.priority}>{list.priority}</span>
                    { list.tags.split(';').map((tag,index)=>(
                        <span key={index} className="bg-primary p-1 rounded m-2 text-white">{tag}</span>
                    ))
                    }
                    <p className="h6">Ending at:{list.Deadline}</p>
                    <Link href={`/dashboard/lists/${list.id}`}><button className="bg-green button">See List</button></Link>
                </div>
            ))}
        </div>

        )
        }
        </>
    )
}