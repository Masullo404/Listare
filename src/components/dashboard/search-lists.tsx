"use client"
import { list, priority } from "@prisma/client"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import styles from "../../styles/dashboard/components/search-lists.module.css"

export default  function SearchLists(){
    const [name,SetName] = useState<string>('')
    const [priority,setPriority] = useState<priority|null>(null)
    const [maxDate,setMax] = useState<string>()
    const [tag,SetTag] = useState<string>('')
    const [lists,setLists] = useState<list[]>()
    useEffect(()=>{
        fetch('/api/Lists/searchLists',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                priority:priority,
                maxDate:maxDate,
                tag:tag,
            })
        }).then(res => res.json()).then(res => setLists(res)).catch(err => console.log(err))
    },[])
    function Search(ev:FormEvent){
        ev.preventDefault()
        fetch('/api/Lists/searchLists',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                priority:priority,
                maxDate:maxDate,
                tag:tag,
            })
        }).then(res => res.json()).then(res => setLists(res)).catch(err => console.log(err))
    }
    return (
    <section className={"d-flex  bg-white  p-3 mt-5 "+styles.SearchSection}>
        <div className={"bg-light p-2 rounded "+styles.SearchDiv}>
            <p className="h3">Filter Lists By:</p>
            <form>
                <div className="d-flex flex-column justify-content-start">
                    <hr />
                        <p className="h3">Priority</p>
                        <div className=" p-2">
                            <div className="alert alert-danger HIGH" >
                                <input type="radio" id="high" name="priority" value="HIGH"
                                onChange={()=>setPriority("HIGH")}/>
                                <label htmlFor="high-search">High</label>    
                            </div>
                        </div>
                        <div  className=" p-2">
                            <div className="alert alert-warning MEDIUM" >
                                <input type="radio" id="medium" name="priority" value="MEDIUM"
                                onChange={()=>setPriority("MEDIUM")}/>
                                <label htmlFor="medium-search">Medium</label>    
                            </div>
                        </div>
                        <div  className=" p-2">
                            <div className="alert alert-primary LOW" >
                                <input type="radio" id="low" name="priority" value="LOW"
                                onChange={()=>setPriority("LOW")}/>
                                <label htmlFor="low-search">Low</label>
                            </div>
                        </div>
                        <div  className="rounded p-2">
                            <div className="alert alert-secondary" >
                                <input type="radio" id="low" name="priority"
                                onChange={()=>setPriority(null)}/>
                                <label htmlFor="low-search">No priority</label>
                            </div>
                        </div>
                    <hr />
                        <label htmlFor="maxdate">Max Date</label>
                        <input type="date" onChange={(ev)=>setMax(ev.target.value)}/>
                    <hr />
                        <label htmlFor="tags" className="h4">Tags</label>
                        <div>
                            <input placeholder="enter a tag" name="tag" type="text" className="w-75" onChange={(ev)=>SetTag(ev.target.value)}/>
                        </div>
                </div>
            </form>
        </div>
        <div className="d-flex flex-column align-items-center w-100">
            <form className={"w-75 "+styles.SearchButton}>
                <input type="text" placeholder="search a list by name"  
                onChange={(ev)=>SetName(ev.target.value)}/>
                <button className="button bg-green " type="submit" onClick={Search}>Search</button>
            </form>
            <hr className="w-75"/>
            <div className={"d-flex flex-wrap p-1 gap-2 align-items-center justify-content-center h-100"}>
                { (lists && lists.length>0)?
                (
                lists && lists.slice(0,6).map(list =>(
                    <div key={list.id} className={"p-3 bg-light rounded d-flex flex-column "+styles.Lists}>
                        <p className="h3">{list.name}</p>
                        <span className={"h5 p-2 rounded "+list.priority}>{list.priority}</span>
                        <p>Tags:</p>
                        { list.tags.split(';').map((tag,index)=>(
                            <span key={index} className="bg-primary p-1 rounded m-2 text-white">{tag}</span>
                        ))
                        }
                        <p className="fs-6">Ending Date: <span className="bg-dark text-white rounded">{list.Deadline.split('-').reduce((a,b)=>a+'/'+b)}</span></p>
                        <Link href={`/dashboard/lists/${list.id}`}><button className="bg-green button ">See List</button></Link>
                    </div>
                ))
                )
                :
                (
                    <div className="alert alert-secondary" role="alert">
                        No Results Found
                    </div>
                )}
            </div>
        </div>
    </ section>        
    )
}