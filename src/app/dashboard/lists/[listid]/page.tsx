import {SingleListProvider} from "@/components/dashboard/single-list";
import SideBar from "@/components/layout/sideBar";

export default function SingleListPage() {
    return(
        <main className="d-flex bg-light">
            <SideBar />
            <SingleListProvider/>
        </main>
    )
}