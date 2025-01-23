"use client"
import { signIn } from "next-auth/react"
export function SignInButton(){
    return(
        <button className="button rounded" onClick={()=>signIn()}>Sign In</button>
    )
}