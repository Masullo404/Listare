"use client"
import { priority } from "@prisma/client"
import { FormEvent, useState } from "react"
import styles from "../../styles/dashboard/components/new-list.module.css"

export default function NewListForm() {
    const [tags,setTags] = useState<string[]>([])
    const [tagInput,setTagInput] = useState<string>('')
    const [name,setName] = useState<string>('')
    const [priority,setPriority] = useState<priority|null>()
    const [deadline,setDeadline] = useState<string>('')
    function AddTag(){
        const newTagsValue = Boolean(tags.length)?(tags.reduce((a,b)=>a+";"+b)+";"+tagInput):(tagInput)
        const newArrayTagsValue = newTagsValue.split(';')
        if(newArrayTagsValue.length>3){
            alert('A List must have a maximum of 3 tags')
            return
        }
        setTags(newArrayTagsValue)
        setTagInput('')
    }
    function DeleteTag(tag:string){
        const newTagsValue = tags.reduce((a,b)=>a+";"+b)
        const newArrayTagsValue = newTagsValue.split(';').filter(Tag=>Tag !== tag)
        setTags(newArrayTagsValue)
    }
    function HandleSubmit(ev:FormEvent){
        ev.preventDefault()
        if( !name.length || !priority || !deadline.length){
            return alert('All the fields must be filled correctly')
        }
        const tagsBody:string[] = []
        if(tags.length > 0){
            tagsBody.push(tags.reduce((a,b)=>a+';'+b))
        } else{
            tags.push('')
        }
        const request = fetch('/api/Lists/newList',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                name:name,
                priority:priority,
                tags: tagsBody[0],
                deadline: deadline
            })
        })
        request.then(res => {
            if(res.status === 200){
                alert('List Created SuccessFully')
                setDeadline('')
                setName('')
                setPriority(null)
                setTags([])
                setTagInput('')
                return
            }
            alert('Something went wrong while creating your List')
        })
    }
    return(
        <>
        <form className="w-75 bg-white rounded p-3 shadow-sm" onSubmit={HandleSubmit}>
            <div className="d-flex justify-content-between ">
                <p className="h1">New List</p>
                <button className="button bg-green" type="submit" >Add Button</button>
            </div>
            <section className={"d-flex gap-3 mt-4 "+styles.OptionsDivs}>
                <div className="bg-light p-3 grow-1">
                    <div className="m-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder="My new list name" name="name" onChange={(ev)=>setName(ev.target.value)}/>
                    </div>
                    <p className="h5 mt-4">Select the Priority:</p>
                    <div className="d-flex flex-column gap-2 justify-content-start">
                            <div className="alert alert-danger HIGH" >
                                <input type="radio" id="high" name="priority" value="HIGH"
                                onChange={()=>setPriority("HIGH")}/>
                                <label htmlFor="high">High</label>    
                            </div>
                            <div className="alert alert-warning MEDIUM" >
                                <input type="radio" id="medium" name="priority" value="MEDIUM"
                                onChange={()=>setPriority("MEDIUM")}/>
                                <label htmlFor="medium">Medium</label>    
                            </div>
                            <div className="alert alert-primary LOW">
                                <input type="radio" id="low" name="priority" value="LOW"
                                onChange={()=>setPriority("LOW")}/>
                                <label htmlFor="low">Low</label>
                            </div>
                    </div>
                </div>
                <div className="bg-light p-3 d-flex flex-column grow-1">
                    <label htmlFor="tag">Add Tags</label>
                    <div className={"text-center "+styles.AddTagBtn}>
                        <input onChange={(ev)=>setTagInput(ev.target.value)} value={tagInput} type="text" placeholder="tag name" className="w-75" />
                        <button className="button bg-green" type="button" onClick={AddTag}>Add Tag</button>
                    </div>
                    <div className="d-flex flex-column gap-2 p-3">
                        { tags.map((tag,index) =>(
                            <div key={index} className="d-flex w-100 bg-primary rounded p-2 justify-content-between 
                            align-items-center">
                                <span className="text-white" >{tag}</span>
                                <button className="button" type="button" onClick={()=>DeleteTag(tag)}>Delete</button>
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className="bg-light p-2 d-flex flex-column justify-content-center align-items-center grow-1">
                    <label htmlFor="date">Select List&apos;s deadline</label>
                    <input type="date" name="deadline" id="deadline" onChange={(ev)=>setDeadline(ev.target.value)}/>
                </div>
            </section>
            </form>
        </>
    )
}