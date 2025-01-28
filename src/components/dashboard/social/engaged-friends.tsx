
import options from "@/app/api/auth/[...nextauth]/options"
import { user } from "@prisma/client"
import { getServerSession } from "next-auth"
import Image from "next/image"

export default async function EngagedFriends() {
    const url = process.env.NEXTAUTH_URL
    const session = await getServerSession(options)
    const response = await fetch(url+"/api/User/engagedFriends",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session})
    })
    if(!response.ok){
        return(
            <>
                <p className="text-center p-2 h2">Engaged Friends</p>
                <section className="w-75 rounded bg-white p-5">
                    <div className="alert alert-secondary">
                        You Don&apos;t have any engaged Friend
                    </div>
                </section>
            </>
        )
    }
    const engagedFriends:user[] = await response.json()
    return(
        <>
        {  (engagedFriends.length > 0)?
        (
            <>
                <p className="h3">Engaged Friends</p>
                <main className="w-75 bg-white rounded p-3 d-flex">
                    { engagedFriends.slice(0,3).map(friend => (
                        <div className="d-flex flex-column bg-light rounde p-5" key={friend.id}>
                            {friend.img && <Image src={friend.img} width={140} height={140} alt="profile image"
                            className="rounded"/>}
                            <p>{friend.name}</p>
                            <span>{friend.description}</span>
                        </div>
                    ))}
                </main>
            </>
        )
        :
        (
        <>
            <p className="text-center p-2 h2">Engaged Friends</p>
            <section className="w-75 rounded bg-white p-5">
                <div className="alert alert-secondary">
                    You Don&apos;t have any engaged Friend
                </div>
            </section>
        </>
        )
        }
        </>
    )
}