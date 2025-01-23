"use client"
import { user } from '@prisma/client';
import { Session } from 'next-auth';
import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface EditTaskProps {
    show: boolean;
    onHide: () => void;
    description: string;
    session:Session
}
export function MyVerticallyCenteredModal({show,onHide,description,session}:EditTaskProps) {
    const [newDesc,setDesc] = useState<string>(description)
    function Changedescription(ev:FormEvent){  
      if(newDesc.length < 40){
        alert("Your description must contain at least 40 characthers!")
        return
      }
      fetch('/api/User/updateUser',{
            method:"PUT",
            headers:{
            'Content-Type':"application/json"
            },
            body:JSON.stringify({session:session,desc:newDesc})
        })
    }
    return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
            <textarea name="desc" id="desc" rows={10} cols={55} placeholder={description} onChange={(ev)=>setDesc(ev.target.value)} value={newDesc}></textarea>
            <br />
            <button onClick={Changedescription} className='button bg-green'>Submit</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function ChangeDescription({description,session}:{description:string,session:Session}) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        description={description}
        session={session}
      />
    </>
  );
}

export function Description({session,user}:{session:Session,user:user}){
    return(
        <>
            <ChangeDescription description={user.description} session={session}/>
        </>
    )
}
