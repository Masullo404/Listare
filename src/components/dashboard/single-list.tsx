"use client"
import { task,list } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { SessionProvider } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react"
import Link from "next/link"
import { EditTaskName } from "./change-task"
import style from "../../styles/dashboard/components/single-list.module.css"

export function SingleListProvider(){
    return(
        <SessionProvider>
            <SingleListComponent/>
        </SessionProvider>
    )
}

export  function SingleListComponent(){
    const params = useParams()
    const listId = params.listid
    const [tasks,setTasks] = useState<task[]>()
    const [list,setList] = useState<list>()
    const [otherLists,setOther] = useState<list[]>()
    const [name,setName] = useState<string>('')
    const {data:session} = useSession()
    function FetchTasks(){
        fetch('/api/Tasks/getTasks',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({listId:listId,session:session})
        }).then(res => res.json()).then(res =>{
            setTasks(res.tasks)
            setList(res)
        }).catch(err => console.log(err))
    }
    useEffect(()=>{
        if(session){
            FetchTasks()
            fetch('/api/Lists/endingLists',{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({session:session})
            }).then(res => res.json()).then(res => setOther(res))
        }  
    },[session])
    function newTask(ev:FormEvent){
        ev.preventDefault()
        fetch('/api/Tasks/newTask',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({session:session,name:name,listId:listId})
        }).then(res =>{
            if(res.ok){
                FetchTasks()
                setName('')
            }
        })
    }
    function updateTasks(method:string,taskName:string){
        if(method == "PUT"){
            fetch('/api/Tasks/newTask',{
            method:method,
            headers:{
                'Content-Type':"application/json"
                },
                body:JSON.stringify({name:taskName,session:session})
            }).then(res => {
                if(res.ok){
                    FetchTasks()
                }
            })
            return
        } 
        fetch('/api/Tasks/newTask',{
            method:method,
            headers:{
                'Content-Type':"application/json"
                },
                body:JSON.stringify({name:taskName,session:session})
        }).then(res =>{
            if(res.ok){
                FetchTasks()
            }
        })
    }
    function FinishList(){
        fetch('/api/Lists/newList',{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({session:session,name:list?.name})
        }).then(res => {
            if(res.ok){
                window.location.href = "/dashboard/lists"
            }
        })
    }
    return(
        <>  
        {(list?.Finished)?
        (
            <div className="w-100 d-flex justify-content-center align-items-center" style={{height:"80vh"}}>
                <div className="alert alert-secondary">
                        This list is no longer open for edits once you&apos;ve finished it
                </div>  
            </div>
        )
        :
        (
            <section className={"d-flex flex-column align-items-center gap-3 w-100 "+style.Main}>
                <nav aria-label="breadcrumb" className="align-self-start p-3">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/dashboard">DashBoard</Link></li>
                        <li className="breadcrumb-item"><Link href="/dashboard/lists">Lists</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{list?.name}</li>
                    </ol>
                </nav>
                <div className="d-flex justify-content-between w-75">
                    <p className="h1  text-start" >{list?.name}</p>
                    {(tasks?.filter(task => task.situation === "UNFINISHED")[0])?
                    (
                        (null)
                    )
                    :
                    <button className="button bg-green" onClick={FinishList}>Finish List</button>
                    }
                </div>
                <form action="" className="d-flex justify-content-center w-75">
                    <input type="text" placeholder="task name" className="w-75" onChange={(ev)=>setName(ev.target.value)} value={name}/>
                    <button className="button bg-green w-25" onClick={newTask}>Add</button>
                </form>
                <div className={"bg-white p-2 d-flex flex-column gap-2 "+style.TasksDiv}>
                {
                (tasks && tasks.length > 0)?
                (tasks.map(task => (
                    <div key={task.name} className="d-flex justify-content-around align-items-center p-2 bg-light rounded">
                        <p className="m-0">{task.name}</p>
                        <span>{task.situation}</span>
                        <div className="d-flex justify-content-evenly gap-3">
                            <button className="button HIGH text-white" onClick={()=>updateTasks('DELETE',task.name)}>Delete</button>
                            {session && <EditTaskName taskName={task.name} session={session} FetchTasks={FetchTasks}/> }
                            <button className="bg-green button" onClick={()=>updateTasks('PUT',task.name)}>Conclude</button>
                        </div>
                    </div>
                )))
                :
                (
                    <div className="alert alert-secondary">
                        There are no tasks in this list 
                    </div>
                )
                }
                </div>  
                <div className="d-flex w-75 justify-content-around gap-3 flex-wrap">
                    <div className="d-flex align-items-center">
                        <p>Priority: </p>
                        <p className={list?.priority}>{list?.priority}</p>     
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="align-self-center">Tags:</p>
                        { list && list.tags.split(';').map((tag,index) => (
                            <span key={index} className={"p-2 bg-primary text-white rounded m-2"}>{tag}</span>
                        ))}
                    </div>
                    <div className="d-flex align-items-center">
                        <p className="fs-5">Deadline:</p>
                        <p className="fs-5">{list?.Deadline.split("-").sort((a,b)=>Number(a)-Number(b)).reduce((a,b)=>a+'/'+b)}</p>
                    </div>
                </div>
                <hr className="w-75"/>
                <div className="w-100 p-5 ">
                    <p className="h2">See related lists: </p>
                    <div className={"d-flex justify-content-center gap-3 "+style.ListsDiv}>
                    { otherLists?.slice(0,5).filter(singleList => singleList.name !== list?.name ).map(list =>(
                        <div key={list.id} className={"d-flex flex-column bg-white rounded rounde p-3 "+style.Lists}>
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
        )
        }
        </>
    )
}