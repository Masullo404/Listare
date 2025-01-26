import options from "../../app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import styles from "../../styles/nav-footer-styles/nav.module.css"
import { SignInButton } from "./signInBtn"
import Image from "next/image"

export default async function NAV(){
    const session = await getServerSession(options)
    return(
        <>
        {   (session)? 
        (
            <>
            <nav className={"d-flex justify-content-between align-items-center p-4 "+styles.nav}>
                <div>
                    <Link href={"/dashboard"} className="h1 text-decoration-none text-white" >Listare</Link>
                </div>
                <div className="d-flex justify-content-center gap-5 fs-5">
                    <Link href={"/dashboard/lists"} className="text-decoration-none text-white">Lists</Link>
                    <Link href={"/dashboard/social"} className="text-decoration-none text-white">Social</Link>
                </div>
                <div>
                    {(session.user?.image)?
                    (
                        <Link href={"/dashboard/profile"} className="text-decoration-none">
                        <button className="button bg-green  border-3 rounded d-flex align-items-center gap-3 p-2">
                            <Image src={session.user.image} alt="user profile image"
                            width={30} height={30} className="rounded"
                            />
                            <p className="m-0">My Profile</p>
                        </button>
                        </Link>
                    )
                    :
                    (
                        <Link href={"/dashboard"}><i className="bi bi-person-fill"></i>My Profile</Link>
                    )
                    }
                </div>
            </nav>
            </>
        )
        :
        (
            <>
            <nav className={"d-flex align-items-center justify-content-between p-4 "+styles.nav}>
                <div>
                    <Link href={"/"} className="h1 text-white text-decoration-none" >Listare</Link>
                </div>
                <div className="d-flex gap-5 ">
                    <Link href={"/features"} className="text-white text-decoration-none align-self-center" >Features</Link>
                    <SignInButton innerText={"sign In"}/>
                </div>
            </nav>
            </>
        )
        }
        </>
    )
}
