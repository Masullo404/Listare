import EndingLists from "@/components/dashboard/ending-lists"
import SharedLists from "@/components/dashboard/shared-lists"
import SideBar from "@/components/layout/sideBar"
import NewListForm from "@/components/dashboard/new-list-form"

export default function DashBoard(){
    return(
        <main className="d-flex bg-light">
            <SideBar />
            {/* MAIN CONTENT */}
            <section className="d-flex flex-column align-items-center gap-5 w-100 py-5">
                    <NewListForm/>
                    <div className="w-100 px-5">
                            <p className="h1 text-center">Ending Lists</p>
                            <EndingLists />
                    </div>
                    <div className="w-75 ">
                        <p className="h1 text-center">Shared Lists</p>
                        <SharedLists />
                    </div>
            </section>
        </main>
    )
}