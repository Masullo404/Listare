import EngagedFriends from "@/components/dashboard/social/engajed-friends";
import MyFriends from "@/components/dashboard/social/my-friends";
import NewFriendForm from "@/components/dashboard/social/new-friend-form";
import SideBar from "@/components/layout/sideBar";

export default async function Social() {
    return(
        <main className="d-flex bg-light">
            <SideBar/>
            <section className="d-flex flex-column align-items-center w-100 p-5 gap-5">
                <NewFriendForm />
                <MyFriends />
                <EngagedFriends />
            </section>
        </main>
    )
}
