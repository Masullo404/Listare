"use client"

import { signOut } from "next-auth/react"

export default function SingOutBtn(){
    return(
        <button className="button bg-green" onClick={()=>signOut()}>SignOut</button>
    )
}