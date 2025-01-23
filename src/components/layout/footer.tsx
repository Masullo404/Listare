import Link from "next/link"
import { getServerSession } from "next-auth"
import options from "@/app/api/auth/[...nextauth]/options"
import styles from "../../styles/nav-footer-styles/footer.module.css"

export default async function FOOTER() {
    const session = await getServerSession(options)
    return(
        <>
        {(session)?
        (
        <>
        <main>
        <div className="d-flex justify-content-center bg-green py-4">
            <div className={"w-50 d-flex justify-content-center align-items-center  "+styles.LinksDiv}>
                <Link href={"/dashboard"} className="text-decoration-none text-white">DashBoard</Link>
                <Link href={"/dashboard/lists"} className="text-decoration-none text-white">Lists</Link>
                <Link href={"/dashboard/social"} className="text-decoration-none text-white">Social</Link>
            </div>
            <div className="w-50 d-flex justify-content-center gap-5">
                    <a href="" className="text-white"><i className="bi bi-github fs-3"></i></a>
                    <a href="" className="text-white"><i className="bi bi-linkedin fs-3"></i></a>
                    <a href="" className="text-white"><i className="bi bi-envelope-at fs-3"></i></a>
            </div>
        </div>
        <div className="bg-green">
            <p className="m-0 text-end pe-2 pb-2 fs-6 pt-1">Developed By : <a href="https://github.com/Masullo404">Joao Masullo</a></p>
        </div>
        </main>
        </>    
        )
        :
        (
        <>
        <main>
        <div className="d-flex justify-content-center bg-green py-4">
            <div className={"w-50 d-flex justify-content-center align-items-center "+styles.LinksDiv}>
                <Link href={"/"} className="text-decoration-none text-white">Home</Link>
                <Link href={"/features"} className="text-decoration-none text-white">features</Link>
                <button className="button"><Link href={"/signin"}>Sign In</Link></button>
            </div>
            <div className={"w-50 d-flex justify-content-center gap-5 "+styles}>
                    <a href="" className="text-white"><i className="bi bi-github fs-3"></i></a>
                    <a href="" className="text-white"><i className="bi bi-linkedin fs-3"></i></a>
                    <a href="" className="text-white"><i className="bi bi-envelope-at fs-3"></i></a>
            </div>
        </div>
        <div className="bg-green">
            <p className="m-0 text-end pe-2 pb-2 fs-6 pt-1">Developed By : <a href="https://github.com/Masullo404">Joao Masullo</a></p>
        </div>
        </main>
        </>    
        )
        }
        </>
    )
}