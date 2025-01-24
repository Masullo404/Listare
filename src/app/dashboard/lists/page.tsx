import NewListForm from "@/components/dashboard/new-list-form";
import SearchLists from "@/components/dashboard/search-lists";
import { ShareListServer } from "@/components/dashboard/share-list";
import SideBar from "@/components/layout/sideBar";


export default async function ListsPage() {
    return(
        <main className="d-flex bg-light">
            <SideBar />
            <section className="d-flex flex-column align-items-center w-100 py-5">
                <NewListForm/>
                <SearchLists />
                <div className="mt-5 w-75">
                    <p className="h1 text-center">Share a list with someone</p>
                    <ShareListServer />
                </div>
            </section>
        </main>
    )
}