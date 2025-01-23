import { Spinner } from "react-bootstrap"

export default function Loading(){
    return(
    <main style={{height:"100vh"}} className="w-100 d-flex align-items-center justify-content-center">
        <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
            <Spinner animation="border" role="status" >
            </Spinner>
            <span className="h3">Loading Content</span>
        </div>
    </main>
    )
}