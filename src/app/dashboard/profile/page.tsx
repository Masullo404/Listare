import options from "@/app/api/auth/[...nextauth]/options"
import { GetUserBySessionServer } from "@/app/api/User/getUserBySession/route"
import { Description } from "@/components/dashboard/profile/change-desc"
import ChangeVisibility from "@/components/dashboard/profile/change-visibility"
import SingOutBtn from "@/components/layout/singOut"
import { list, user } from "@prisma/client"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { ProgressBar } from "react-bootstrap"
import styles from "../../../styles/dashboard/components/my-profile.module.css"

export default async function Profile() {
    const url = process.env.NEXTAUTH_URL
    const session = await getServerSession(options)
    if(!session) return (
        <>
            <p>Not Authorized</p>
        </>
    )
    const finishedListsResponse = await fetch(url+'/api/Lists/finishedLists',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session})
    })
    const finishedList:list[] = await finishedListsResponse.json()

    const friendsResponse = await fetch(url+"/api/User/friends",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session})
    })
    const friends:user[] = await friendsResponse.json()

    const user = await GetUserBySessionServer(session)
    const recentResponse = await fetch(url+'/api/Lists/recentLists',{
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({session:session})
    })   
    const recentLists:list[] = await recentResponse.json()

    const engagedResponse = await fetch(url+"/api/User/engagedFriends",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({session:session})
    })
    const engagedFriends:user[] = await engagedResponse.json()

    return(
        <main className="bg-light">
            <section className={"d-flex justify-content-center p-5 "+styles.MainSection}>
                <div className={"bg-white rounded w-25 d-flex flex-column align-items-center rounded p-3 "+styles.ProfileDiv}>
                    {session?.user?.image && <Image src={session.user.image} alt="user image" 
                    width={200} height={200} className="img-fluid"/>}
                    <p className="h1 p-4">{session?.user?.name}</p>
                    <div className="w-100 m-2">
                        <span>My Scode:</span>
                        <span>{user?.Scode}</span>
                    </div>
                    <div className="d-flex flex-column aling-items-center w-100">
                        <p>Description:</p>
                        <div className="w-100">
                            <p>{user?.description}</p>
                        </div>
                        {session && user && <Description session={session} user={user}/>}
                    </div>
                    <hr className="w-75"/>
                    <div className="d-flex flex-column align-items-center mb-3">
                        { user && <ChangeVisibility visibility={user.HideProfile} session={session}/>}
                        <span className="text-center">If marked, your profile will be private and nobody will see it.</span>
                    </div>
                    <SingOutBtn />
                </div>
                <div className="w-75">
                    <p className="text-center h2">Recent Finished Lists</p>
                    <div className={"d-flex justify-content-center gap-2 flex-wrap"}>
                        { recentLists && recentLists.slice(0,3).map(list =>(
                            <div key={list.id} className="d-flex flex-column bg-white rounded p-3">
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
                </div>
            </section>
            <div className="d-flex justify-content-center">
                <hr className="text-center w-75"/>
            </div>
            <section className={"p-5 d-flex justify-content-around w-100 gap-3 "+styles.SecondSection}>
                <div >
                    <p className="h2">User Achivements:</p>
                    <div>
                        <ol className="d-flex flex-column gap-4">
                            <li className="d-flex">
                                <span className="w-25 h4">1. Finish 10 lists (Starter)</span>
                                <div className="w-75">
                                    <ProgressBar striped variant="success" now={(finishedList.length/10)*100} />
                                </div>
                                <span className="ms-2">{finishedList.length}/10</span>
                            </li>
                            <li className="d-flex">
                                <span className="w-25 h4">2. Add 5 friends (Friendly)</span>
                                <div className="w-75">
                                    <ProgressBar striped variant="success" now={(friends.length/5)*100} />
                                </div>
                                <span>{friends.length}/10</span>
                            </li>
                            <li className="d-flex">
                                <span className="w-25 h4">3. Finish 25 lists (adventurer)</span>
                                <div className="w-75">
                                    <ProgressBar striped variant="success" now={(finishedList.length/25)*100} />
                                </div>
                                <span>{finishedList.length}/10</span>
                            </li>
                            <li className="d-flex">
                                <span className="w-25 h4">4. Finish 50 lists (expert)</span>
                                <div className="w-75">
                                    <ProgressBar striped variant="success" now={(finishedList.length/50)*100} />
                                </div>
                                <span>{finishedList.length}/10</span>
                            </li>
                        </ol>
                    </div>
                </div>
                <div className={"bg-dark "+styles.VerticalLine} style={{width:"1%"}}>d</div>
                <hr />
                <div>
                    <p className="h2">Engaged Friends</p>
                    <div className="d-flex flex-wrap">
                        {engagedFriends && engagedFriends.slice(0,3).map(friend =>(
                        <div className={"d-flex flex-column bg-white rounded p-5 gap-1 "+styles.EngagedFriends} key={friend.id}>
                            {friend.img && <Image src={friend.img} width={140} height={140} alt="profile image"
                            className="rounded"/>}
                            <p>{friend.name}</p>
                            <span>{friend.description}</span>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}