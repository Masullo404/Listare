"use client"
import { list, user } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"


import Link from "next/link"
import { Session } from "next-auth"

export function SingleFriendPage({session}:{session:Session}) {
    const {friendid} = useParams()
    const [friends,setFriends] = useState<user[]>()
    const [sharedLists,setShared] = useState<list[]>()
    useEffect(()=>{
        fetch("/api/User/friends",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({session:session})
        }).then(res => res.json()).then(res => setFriends(res))
        fetch("/api/Lists/sharedWithMe",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({session:session,allshares:true})
        }).then(res => res.json()).then(res => setShared(res))
    },[])
    
    const friend = friends?.filter(friend => friend.id === Number(friendid))[0]
    if(friend?.HideProfile){
        setTimeout(()=>{
            window.location.href = "/dashboard/social"
        },2000)
        return(
        <main>
            <div className="alert alert-secondary">
                The user's profile is private, redirecting...
            </div>
        </main>
        )
    }
    return(
        <main className="bg-light">
           <section className="d-flex p-5 gap-5">
                <div className="d-flex flex-column w-25 bg-white rounded shadow-sm p-5 align-items-center">
                    { friend &&  friend.img && <Image src={friend?.img} alt="profile image"
                    width={140} height={140} className="rounded"/>}
                    <p>Name:{friend?.name}</p>
                    <p>Description:{friend?.description}</p>
                </div>
                <div>
                <p className="h1 text-center">Shared Lists</p>
                <div className="w-75 d-flex">
                    {sharedLists && sharedLists.map(list =>(
                        <div className="d-flex flex-column gap-3 bg-white p-3 rounded shadow-sm">
                            <span>{list.name}</span>
                            <span>{list.priority}</span>
                            {list.tags.split(";").slice(0,3).map((tag,index) =>(
                                <span className="bg-primary p-2 rounded text-white" key={index}>{tag}</span>
                            ))}
                            <Link href={`/dashboard/lists/${list.id}`}><button className="button bg-green">See list</button></Link>
                        </div>
                    ))}
                </div>
                </div>
           </section>
        </main>
    )
}