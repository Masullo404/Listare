import Link from "next/link"
import { getServerSession } from "next-auth"
import options from "@/app/api/auth/[...nextauth]/options"
import styles from "../../styles/nav-footer-styles/footer.module.css"
import { SignInButton } from "./signInBtn"

export default async function FOOTER() {
    const session = await getServerSession(options)
    return(
        <>
        {(session)?
        (
        <footer>
            <div className="d-flex justify-content-center bg-green py-4">
                <div className={"w-50 d-flex justify-content-center align-items-center  "+styles.LinksDiv}>
                    <Link href={"/dashboard"} className="text-decoration-none text-white">DashBoard</Link>
                    <Link href={"/dashboard/lists"} className="text-decoration-none text-white">Lists</Link>
                    <Link href={"/dashboard/social"} className="text-decoration-none text-white">Social</Link>
                </div>
                <div className="w-50 d-flex justify-content-center gap-5">
                        <a href="#" className="text-white"><i className="bi bi-github fs-3"></i></a>
                        <a href="#" className="text-white"><i className="bi bi-linkedin fs-3"></i></a>
                        <a href="#" className="text-white"><i className="bi bi-envelope-at fs-3"></i></a>
                </div>
            </div>
            <div className="bg-green">
                <p className="m-0 text-end pe-2 pb-2 fs-6 pt-1">Developed By : <a href="https://github.com/Masullo404">Joao Masullo</a></p>
            </div>
        </footer>
        )
        :
        (
        <footer className={styles.Footer}>
            <div className={"d-flex justify-content-evenly py-4 "+styles.FooterMainContent}>
                <div className={"w-50 d-flex justify-content-center align-items-center "+styles.LinksDiv}>
                    <Link href={"/"} className="text-decoration-none text-white">Início</Link>
                    <Link href={"/funcionalidades"} className="text-decoration-none text-white">Funcionalidades</Link>
                    <SignInButton innerText="Entrar" styles={styles.SignInButton}/>
                </div>
                <div className={"w-25 d-flex flex-column text-white "+styles.MediaIcons}>
                    <p className="fs-4">Contato</p>
                    <span>Email: <u>masullowebdev@gmail.com</u></span>
                    <p className="fs-4">Redes Sociais</p>
                    <div className="d-flex gap-4">
                        <a href="https://github.com/Masullo404" className="text-white"><i className="bi bi-github "></i></a>
                        <a href="https://www.linkedin.com/in/jo%C3%A3o-masullo-846b672b9/" className="text-white"><i className="bi bi-linkedin "></i></a>
                        <a href="https://www.instagram.com/joao_masullo/" className="text-white"><i className="bi bi-instagram"></i></a>
                        <a href="https://www.facebook.com/people/JoaoMasullo/61573914655245/" className="text-white"><i className="bi bi-facebook"></i></a>
                    </div>
                </div>
            </div>
            <div className="py-2 text-white">
                <p className="m-0 text-start pe-2 pb-2 fs-6 pt-1">Desenvolvido por: <a href="https://github.com/Masullo404" className="text-decoration-none">Joao Masullo</a></p>
            </div>
        </footer>
        )
        }
        </>
    )
}