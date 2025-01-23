'use client'
import { Session } from "next-auth"
import { Form } from "react-bootstrap"
export default  function ChangeVisibility({visibility,session}:{visibility:boolean,session:Session}) {
    function UpdateUser (state:boolean){
        fetch('/api/User/updateUser',{
            method:"PUT",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({hide:state,session:session})
        })
    }
    return(
        <>
            <Form>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Hide Profile"
                    onChange={(ev)=>UpdateUser(ev.target.checked)}
                    defaultChecked={visibility}
                />
            </Form>
        </>
    )
}