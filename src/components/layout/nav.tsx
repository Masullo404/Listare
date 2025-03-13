import options from "../../app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import styles from "../../styles/nav-footer-styles/nav.module.css"
import { SignInButton } from "./signInBtn"
import Image from "next/image"
import OffCanvasMenuBtn from "./canvas-menu-btn"

export default async function NAV(){
    const session = await getServerSession(options)
    return(
        <>
        {   (session)? 
        (
            <>
            <nav className={"d-flex justify-content-between align-items-center p-4 "+styles.nav}>
                <div>
                    <p className={styles.Logo}>Listare</p>
                </div>
                <div className={styles.CentralLinks+" justify-content-center gap-5 fs-5 "+styles.NavLinks}>
                    <Link href={"/dashboard/lists"} className="text-decoration-none text-white">Lists</Link>
                    <Link href={"/dashboard/social"} className="text-decoration-none text-white">Social</Link>
                </div>
                <div className={styles.NavLinks}>
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
                <div className={styles.OffcanvasBtn}>
                    <OffCanvasMenuBtn />
                </div>
            </nav>
            </>
        )
        :
        (
        <nav className={"d-flex align-items-center justify-content-around p-4 "+styles.nav}>
            <div>
                <p className={styles.Logo}>Listare</p>
            </div>
            <div className={"d-flex gap-5 "+styles.NavLinks}>
                <Link href={"/"} className="text-white text-decoration-none align-self-center" >Início</Link>
                <Link href={"/funcionalidades"} className="text-white text-decoration-none align-self-center" >Funcionalidades</Link>
                <SignInButton innerText={"Entrar"} styles={styles.SignInButton}/>
            </div>
            <div className={styles.OffcanvasBtn}>
                <OffCanvasMenuBtn />
            </div>
        </nav>
        )
        }
        </>
    )
}
