"use client"
import { signIn } from "next-auth/react"
export function SignInButton({innerText,styles}:{innerText:string,styles?:string}){
    return(
        <>
        {   (styles)?
            (
                <button className={styles} onClick={()=>signIn()}>{innerText}</button>
            )
            :
            (
                <button className="button rounded" onClick={()=>signIn()}>{innerText}</button>
            )
        }
        </>
    )
}