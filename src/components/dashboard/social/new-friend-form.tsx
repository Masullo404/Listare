"use client"

import { user } from "@prisma/client"
import Image from "next/image"
import { FormEvent, useState } from "react"
import styles from "../../../styles/dashboard/components/my-friends.module.css"

export default  function NewFriendForm() {
    const [scode,setScode] = useState<string>('')
    const [user,setUser] = useState<user|null>(null)
    function VerifyUser(ev:FormEvent){
        ev.preventDefault()
        fetch('/api/User/searchFriend',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({scode:scode})
        }).then(res => res.json()).then(res => setUser(res)).catch(err => console.log(err))
    }
    function AddFriend(){
        fetch('/api/User/addFriend',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({scode:scode})
        }).then(res => res.json()).then(res =>{ 
            alert('User Added SucessFully!')
            setUser(res)
        }).catch(err => console.log(err))
        setUser(null)
        setScode('')
    }
    return(
        <div className={"w-75 bg-white rounded shadow-sm p-3 "}>
            <form className="w-100 d-flex flex-column ">
                <div className="w-100 d-flex justify-content-between">
                    <p className="h3">Add A Friend</p>
                    <button className="button bg-green" onClick={VerifyUser}>Search</button>
                </div>
                <div>
                    <label htmlFor="Scode" className="me-2">Enter Friend&apos;s SCode:</label>
                    <input type="text" placeholder="e.g: 12132342" className="w-100" value={scode} onChange={(ev)=>setScode(ev.target.value)}/>
                </div>
            </form>
            { user ? 
            (
                <div className="mt-3 p-5 bg-light">
                    <div className={"w-100 d-flex justify-content-center bg-light rounded p-4 gap-5 "+styles.ScodePreview}>
                        <div className="d-flex flex-column align-items-center">
                            {user.img && <Image src={user.img} width={140} height={140} className="rounded align-self-center"
                            alt="profile image"/>}
                            <p className="h6">User&apos;s name: {user?.name}</p>
                        </div>
                        <p className="justify-self-center"> User&apos;s description: {user.description}</p>
                    </div>
                    <div className="w-100 d-flex justify-content-center">
                        <button className="button bg-green" onClick={AddFriend} >Add Friend</button>
                    </div>
                </div>
            )
            :
            (
                <div className="alert alert-secondary m-3">
                    Enter somebody&apos;s SCode and then click search
                </div>
            )
            }
        </div>
    )
}