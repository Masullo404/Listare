import options from "@/app/api/auth/[...nextauth]/options"
import { list } from "@prisma/client"
import { getServerSession } from "next-auth"
import Link from "next/link"
import styles from "../../styles/dashboard/components/ending-lists.module.css"

export default async function EndingLists() {
    const url = process.env.NEXTAUTH_URL
    const session = await getServerSession(options)
    const response = await fetch(url+'/api/Lists/endingLists',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({session:session})
    })
    if(!response.ok){
        return(
            <div className="alert alert-danger" role="alert">
                Something went wrong when rendering the lists
            </div>
        )
    }
    const endingLists:list[] = await response.json()
    return(
        <div className={"d-flex w-100 justify-content-center p-5 gap-5 w-75 bg-white rounded shadow "+styles.MainDiv}>
            {(endingLists && endingLists.length > 0)?
            ( endingLists.slice(0,4).map(list =>(
                <div key={list.id} className={"d-flex flex-column bg-light rounde p-3 "+styles.SingleList}>
                    <p className="h3">{list.name}</p>
                    <span className={list.priority}>{list.priority}</span>
                    { list.tags.split(';').map((tag,index)=>(
                        <span key={index} className="bg-primary p-1 rounded m-2 text-white">{tag}</span>
                    ))
                    }
                    <p className="h6">Ending at:{list.Deadline}</p>
                    <Link href={`/dashboard/lists/${list.id}`}><button className="bg-green button">See List</button></Link>
                </div>
            ))
            )
            :
            (
                <div className="alert alert-danger" role="alert">
                    You Don't have lists yet.
                </div>  
            )
            }
        </div>
    )
}