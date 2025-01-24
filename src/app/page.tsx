import FOOTER from "@/components/layout/footer"
import NAV from "@/components/layout/nav"
import Image from "next/image"
import styles from "../styles/homepage/styles.module.css"
import Link from "next/link"
import { getServerSession } from "next-auth"
import options from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

export default async function Home(){
    const session = await getServerSession(options)
    if(session) {
        const url = process.env.NEXTAUTH_URL
        return redirect(url+'/dashboard')
    }
    return(
        <>
            <NAV/>
            <section className="position-relative ">
                <img src="https://img.freepik.com/free-photo/weekly-plan-clipboard-cup-coffee-wooden-desk_23-2147898418.jpg?t=st=1736711213~exp=1736714813~hmac=d70dca8410eb6ca31e5bff2a8235b24c76a3ecdb0ee6c1048bfcaab1b96132a8&w=1380"
                alt="Woooden table with a cup" className={"w-100 h-75 img-fluid "+styles.FirstImageSection} />
                <div className={styles.AboveText}>
                    <h1>Listare</h1>
                    <p>The best tasks manager tool ever! </p>
                    <p>Listare makes everything easy and organized.</p>
                    <button type="button" className={"button"}><Link href={"/signin"}>Use it now</Link></button>
                </div>
            </section>

            <section className={"d-flex justify-content-center gap-5 p-3 mt-2 "+styles.FirstSection}>
                <div className="d-flex flex-column justify-content-center ">
                    <p className="h3 text-center">Listare makes your more productive</p>
                    <p className="text-center">Using Listare, you&apos;re going to become highly productive, organized and focused. It is easy to use and totally customizable!</p>
                    <button type="button" className={"button bg-green w-25 align-self-center "+styles.FirstSectionBtn}><Link href={"/signin"}>Give it a try!</Link></button>
                </div>
                <div>
                    <Image src={"https://img.freepik.com/free-photo/icon-business-target-project-tasks-list-time_107791-15845.jpg?t=st=1736717748~exp=1736721348~hmac=c600a99e61fedc5cfee435bf51a00bfdca0a964bdb10edbed7d5144dfe343977&w=1060"}
                    className={"rounded img-fluid w-100 "+styles.FirstSectionImage} height={500} width={500} alt="To-do-list"
                    />
                </div>
            </section>
            {/* CARDS SECTION */}
            <section className="mt-5 px-5">
                <p className="h3 text-center">Features</p>
                <div className="d-flex justify-content-center"><hr className="w-75"/></div>
                <div className={"d-flex flex-wrap justify-content-center "+styles.DivCards}>
                    <div className={"shadow m-2 rounded "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-vector/deadline-time-management-business-concept_107791-4070.jpg?t=st=1736718820~exp=1736722420~hmac=e3e7dce62626823183af0a1eae327e432f99d45a836260ad655795961f8583ab&w=1380"}
                        className="rounded-top  img-fluid w-100 h-50" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Tags</p>
                            <p className="text-center">Listare allows you to add tags to your lists, making the process more organized</p>
                            <button type="button" className={"bg-green button   "}><Link href={"/signin"}>Try it!</Link></button>
                        </div>
                    </div>
                    <div className={"shadow m-2  rounded  "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-photo/calendar-agenda-event-meeting-reminder-schedule-graphic-concept_53876-124859.jpg?t=st=1736721359~exp=1736724959~hmac=c83feb7064fcb25ac617fea3a74d12893fa57072509222a9367c33b4ffe4bbb2&w=1380"}
                        className="h-50 rounded-top  img-fluid w-100" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Priorities</p>
                            <p className="text-center">With Listare you can add priorities to your lists, and even create your owns priorities, making everything more dynamic</p>
                            <button type="button" className={"bg-green button   "}><Link href={"/signin"}>Try it!</Link></button>
                        </div>
                    </div>
                    <div className={"shadow m-2 rounded "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-vector/social-media-speech-bubbles_53876-89120.jpg?t=st=1736721501~exp=1736725101~hmac=5b5d6c2b2b810bc20e64ed20c3cbaa628d8052e537b644114837b2addf9c16dc&w=1380"}
                        className="h-50 rounded-top  img-fluid w-100" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Shares</p>
                            <p className="text-center">It gives you the opportunity to make friends and share your lists with them, and theirs with you! Creating a funny environment</p>
                            <button type="button" className={"bg-green button   "}><Link href={"/signin"}>Try it!</Link></button>
                        </div>
                    </div>
                    <div className={"shadow m-2  rounded "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-photo/calendar-with-date-schedule-alarm-clock_107791-15677.jpg?t=st=1736721541~exp=1736725141~hmac=1e19f5e6d2c073684dc26616f40c61379637aa185469cc4aa9e7120dc2492599&w=1060"}
                        className="h-50 rounded-top  img-fluid w-100 object-fit-cover" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Dates</p>
                            <p className="text-center">Dates are very important, Listare knows it and provides you a simplified and useful dates-list system to make you more productive</p>
                            <button type="button" className={"bg-green button "}><Link href={"/signin"}>Try it!</Link></button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className={"position-relative my-5 "+styles.ThirdSection}>
                <img src="https://img.freepik.com/free-photo/close-up-still-life-hard-exams_23-2149314078.jpg?t=st=1736792019~exp=1736795619~hmac=fd69c972e1b988a5c2052b1998be2df490f79ddb74346e0ca91bbd76d03d1446&w=1380"
                className={"w-100 "+styles.FirstImageSection} alt="person working on an desk" />
                <div className={styles.AboveText+" d-flex flex-column align-items-center"}>
                    <p className="h1">Productive, Organized and Efficient</p>
                    <p>This is what Listare provides you.</p>
                    <p>A whole new way to achieve your goals, and manage your tasks!</p>
                    <button type="button" className={"button bg-green w-25"}><Link href={"/signin"}>Use it now</Link></button>
                </div>
            </section>


            <section className={"p-5 my-5 "+styles.FourthSection}>
                <p className="h1 text-center mb-5">Main Questions</p>
                <div className={"d-flex justify-content-center w-100 gap-5 "+styles.FAQ}>
                    <div className={" text-center shadow rounded w-50 p-4"}>
                        <p className="h4">How is Listare going increase my productivity?</p>
                        <p>Listare boosts productivity by centralizing tasks, automating workflows, enabling collaboration
                            , and providing clear tracking and insights—all in one tool.</p>
                    </div>
                    <div className={" text-center shadow w-50 p-4"}>
                        <p className="h4">What&apos;s the difference between Listare and any other task management app?</p>
                        <p>Listare is a unique option in the web, it provides you a completely easy-to-use platform with several useful funcionalities just in order
                            to make you have the best experience ever!
                        </p>
                    </div>
                </div>
                <div className={"d-flex justify-content-center w-100 gap-5 mt-5 "+styles.FAQ}>
                    <div className={" text-center shadow rounded w-50 p-4"}>
                        <p className="h4">Does it work for a team&apos;s productivity?</p>
                        <p>Yes, it does! It works even better when there&apos;s a group using it, with a team along with you Listare provides 
                            a completely new experience, bringing interativity, flexibility and optimization!
                        </p>
                    </div>
                    <div className={" text-center shadow w-50 p-4"}>
                        <p className="h4">Is there a mobile app available for managing my tasks on the go?</p>
                        <p>Unfortunately there&apos;s no mobile application for Listare yet. However Listare provides you an incredible online platform that you
                            can access from anywhere as long as you have internet and a eletronic device connected to it.
                        </p>
                    </div>
                </div>
            </section>
            <section className={"bg-black d-flex justify-content-center text-white p-5 mt-5 "+styles.ContactSection}>
                <div className="d-flex flex-column align-items-center justify-content-start pt-5 ">
                    <p className="h3">Get in touch</p>
                    <p className="text-center w-50">Leave your comment completing the following form, or send a message in our social medias</p>
                    <ol className="d-flex justify-content-evenly w-100">
                        <a href="" className="text-white"><i className="bi bi-github fs-3"></i></a>
                        <a href="" className="text-white"><i className="bi bi-linkedin fs-3"></i></a>
                        <a href="" className="text-white"><i className="bi bi-envelope-at fs-3"></i></a>
                    </ol>
                </div>
                <div className={"w-25 "+styles.ContactForm}>
                    <form className="d-flex flex-column py-5 w-75 gap-1">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Your name" className="rounded" />
                        <label htmlFor="">Comment</label>
                        <textarea name="comment" id="comment" className="rounded" rows={7} cols={10} placeholder="Leave your comment here"></textarea>
                        <button className="button bg-green mt-3">Send</button>
                    </form>
                </div>
            </section>
            <FOOTER/>
        </>
    )
}