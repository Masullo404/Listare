import { Session } from 'next-auth';
import React, { FormEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface EditTaskProps {
    show: boolean;
    onHide: () => void;
    taskName: string;
    session:Session;
    FetchTasks: () => void;
}
export function MyVerticallyCenteredModal({show,onHide,taskName,session,FetchTasks}:EditTaskProps) {
    const [name,setName] = useState<string>(taskName)
    function ChangeTaskName(ev:FormEvent){  
      ev.preventDefault()
      fetch('/api/Tasks/newTask',{
            method:"PUT",
            headers:{
                'Content-Type':"application/json"
                },
                body:JSON.stringify({name:taskName,session:session,newName:name})
        }).then(res =>{
          if(res.ok){
            FetchTasks()
          }
        })
    }
    return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
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
            <input type="text" placeholder={taskName} onChange={(ev)=>setName(ev.target.value)} value={name}/>
            <button onClick={ChangeTaskName} className='button bg-green'>Submit</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function EditTaskName({taskName,session,FetchTasks}:{taskName:string,session:Session,FetchTasks:()=>void}) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        taskName={taskName}
        session={session}
        FetchTasks={FetchTasks}
      />
    </>
  );
}
