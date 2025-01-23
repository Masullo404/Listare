import options from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { SingleFriendPage } from "./component"


export default async function Friend() {
    const session = await getServerSession(options)
    return(
        <>
            {session && <SingleFriendPage session={session}/>}
        </>
    )
}