import CustomCarousel from "@/components/layout/carousel"
import FOOTER from "@/components/layout/footer"
import NAV from "@/components/layout/nav"
import styles from "../../styles/features/style.module.css"

export default function Features(){
    return(
        <>
            <NAV />
            <main>
                <section>
                    <CustomCarousel />
                </section>
                <section className={"bg-black d-flex text-light p-5 flex-wrap "+styles.Divs}>
                    <div className="text-center align-content-center p-5">
                        <p className="h1">Tags</p>
                        <p>Listare allows you to organize your lists using tags for personal topics, 
                        such as chores, buyings and things that only you recognize</p>
                    </div>
                    <div>
                        <img src="/sticky-note-cork-board_1339-105.jpg" alt="post its" className="object-fit-cover w-100 rounded h-100" />
                    </div>
                </section>

                <section className={"bg-black d-flex text-light p-5 gap-3 p-5 "+styles.OddDivs} >
                    <div >
                        <img src="/woman-writing-planning-business-strategy_53876-26330.jpg" className="rounded object-fit-cover w-100" alt="image" />
                    </div>
                    <div className="align-content-center text-center p-5">
                        <p className="h1">Priorities</p>
                        <p>Using listare you'll be able to custmize your lists based
                        on priorities, it makes your workflow more dynamic and organized, leading you to a great experience</p>
                    </div>
                </section>

                <section className={"bg-black p-5 d-flex text-light "+styles.Divs}>
                    <div className="text-center align-content-center p-5">
                        <p className="h1">Shares</p>
                        <p>You can share your lists with your friends or with your work team, making the process easier and simplified.</p>
                    </div>
                    <div className="align-content-center text-center ">
                        <img src="/smartphones-sharing-information-with-their-applications_1134-87.avif" className="rounded object-fit-cover w-100" alt="image" />
                    </div>
                </section>

                <section className={"bg-black p-5 d-flex text-light "+styles.OddDivs}>
                    <div className="text-center align-content-center ">
                        <img src="/time-organization-concept-with-calendar-view_23-2149046738.jpg" className="rounded object-fit-cover w-100" alt="image" />
                    </div>
                    <div className="align-content-center text-center p-5">
                        <p className="h1">Dates system</p>
                        <p>It provides you a complete calendar, where you can manage your lists and tasks based on the deadline.</p>
                    </div>
                </section>
            </main>            
            <FOOTER />
        </>
    )
}