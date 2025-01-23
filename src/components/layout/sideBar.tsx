import Friends from "../dashboard/friends";
import ImportantLists from "../dashboard/important-lists";
import RecentLists from "../dashboard/recents-lists";
import styles from "../../styles/dashboard/styles.module.css"

export default async function SideBar() {
    return(
        <section className={"bg-black ps-4 py-5 text-white "+styles.SideBar}>
        <div>
            <p className="h4">Recent Lists:</p>
            <div className="d-flex flex-column ">
                <RecentLists />
            </div>
            <hr />
        </div>
        <div>
            <p className="h4">Friends:</p>
            <div>
                <Friends />
            </div>
            <hr />
        </div>
        <div>
            <p className="h4">Important Lists:</p>
            <div className="d-flex flex-column">
                <ImportantLists />
            </div>
            <hr />
        </div>
    </section>
    )
}