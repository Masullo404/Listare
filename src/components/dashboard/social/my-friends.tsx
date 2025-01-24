import options from "@/app/api/auth/[...nextauth]/options"
import { user } from "@prisma/client"
import { getServerSession } from "next-auth"
import Image from "next/image"
import styles from "../../../styles/dashboard/components/my-friends.module.css"

export default async function MyFriends() {
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
                <div className="alert alert-secondary">
                    You Don&apos;t have friends yet
                </div>
            </>
        )
    }
    const friends:user[] = await response.json()
    return(
        <>
        <p className="text-center h1">My Friends</p>
        <div className={"bg-white d-flex p-3 rounded w-75 "+styles.MyFriends}>
            { friends && friends.map(friend => (
                <div className={"d-flex flex-column bg-light rounded align-items-center gap-1 p-5 "} key={friend.id}>
                    {friend.img && <Image src={friend.img} width={140} height={140} alt="profile image"
                    className="rounded"/>}
                    <p>{friend.name}</p>

                    <span>{friend.description}</span>
                </div>
            ))}
        </div>        
        </>
    )
}