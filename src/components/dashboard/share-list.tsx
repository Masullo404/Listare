"use client"
import { list, permission, user } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import styles from "../../styles/dashboard/components/share-list.module.css"

export function ShareListServer() {
    return(
        <section className='bg-white p-5 rounded'>
            <SessionProvider>
                <ShareList />
            </SessionProvider>
        </section>
    )
}

export function ShareList(){
    const [lists,setLists] = useState<list[]>()
    const [friends,setFriends] = useState<user[]>()
    const [selectedList,setSelectList] = useState<list|null>(null)
    const [selectedFriend,setSelectFriend] = useState<user|null>(null)
    const [permission,setPermission] = useState<permission|null>(null)
    const {data:session} = useSession()

    function ShareList(){
        if(!selectedFriend || !selectedList || ! permission){
            alert("You must select a friend, a list and a permission to share")
            return
        }
        fetch('/api/Lists/shareLists',{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                permission:permission,
                userTwo:selectedFriend,
                listId:selectedList.id,
            })
        }).then(res => {
            if(!res.ok){
                alert('Something went wrong when sharing the list, please try again.')
                return
            }
            alert("Lists added sucessfully")
            setSelectFriend(null)
            setSelectList(null)
            setPermission(null)
        })
    }

    useEffect(()=>{
        if(session){
            fetch('/api/Lists/searchLists',{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({session:session})
            }).then(res => res.json()).then(res => setLists(res)).catch(err => console.log(err))
            fetch('/api/User/friends',{
                method:"POST",
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({session:session})
            }).then(res => res.json()).then(res => setFriends(res)).catch(err => console.log(err))
        }
    },[session])
    return(
        <main className={'w-100 d-flex '+styles.ShareListMain}>
        
        <section className={'d-flex justify-content-around w-75 '+styles.ListFriendSection}>
            <div>
                <div>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select One List
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    { lists && lists.map(list => (
                        <Dropdown.Item onClick={()=>setSelectList(list)} key={list.id}>{list.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
                </Dropdown>
                </div>
                <div className='d-flex flex-column'>
                    { (selectedList)?
                    (
                        <>
                        <span>Selected List: {selectedList.name}</span>
                        <div className='d-flex flex-column p-3 bg-light'>
                            <div className='d-flex justify-content-between'>
                                <p className='h6'> {selectedList.name}</p>
                                <span className={selectedList.priority+" p-2 rounded"}>{selectedList.priority}</span>
                            </div>
                            <p>Tags:</p>
                            <div className='d-flex flex-column gap-2'>
                                {selectedList.tags.split(';').map((tag,index)=>(
                                    <span key={index} className='bg-primary rounded text-white p-2'>{tag}</span>
                                ))}
                            </div>
                            <p>Ending date:{selectedList.Deadline.split('-').sort().reduce((a,b)=>a+'/'+b)}</p>
                            <button className='bg-green button'>See List</button>
                        </div>
                        </>
                    )
                    :
                    (
                        null
                    )
                    }
                </div>
            </div>
            
            <div>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select the friend
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            { friends && friends.map(friend => (
                                <Dropdown.Item onClick={()=>setSelectFriend(friend)} key={friend.id}>{friend.name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    {  (selectedFriend)?
                    (
                        <>
                        <span>Selected Friend:</span>
                        <div className='d-flex flex-column p-3 bg-light '>
                            {selectedFriend.img && <Image src={selectedFriend.img} width={140} height={140} 
                            alt='profile image' className='align-self-center rounded mb-2'/>}
                            <p className=''>Name: {selectedFriend.name}</p>
                            <p>Description: {selectedFriend.description}</p>
                        </div>
                        </>
                    )
                    :
                    (null)
                    }
                </div>
            </div>
        </section>
        <div className='d-flex flex-column justify-content-center gap-3'>
                {
                selectedFriend && <label htmlFor="permission">Select the {selectedFriend?.name}&apos;s&apos; permission</label>
                }
                <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Select the permission
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=>setPermission('VIEWER')}>VIEWER: User can only see the list and the tasks, but not edit them</Dropdown.Item>
                            <Dropdown.Item onClick={()=>setPermission('EDITOR')}>EDITOR: User can create, exclude and edit the list and the tasks</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
                { permission && <span>Permission: {permission}</span> }
                <button className='button bg-green' onClick={ShareList}>Share List</button>
        </div>
        </main>
    )
}