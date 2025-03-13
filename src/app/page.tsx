import FOOTER from "@/components/layout/footer"
import NAV from "@/components/layout/nav"
import Image from "next/image"
import styles from "../styles/homepage/styles.module.css"
import { getServerSession } from "next-auth"
import options from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import { SignInButton } from "@/components/layout/signInBtn"

export default async function Home(){
    const session = await getServerSession(options)
    if(session) {
        return redirect('/dashboard')
    }
    return(
        <>
            <NAV/>  
            <section className={"position-relative "+styles.ParallaxSection}>
                <div className={styles.AboveText}>
                    <h1 className="display-1">Listare</h1>
                    <p className="fs-3">O melhor gerenciador de tarefas no mercado. </p>
                    <p className="fs-3">Listare faz tudo ficar mais fácil e organizado.</p>
                    <SignInButton innerText="Usar agora" styles={styles.SignInButton}/>
                </div>
            </section>

            <section className={"d-flex justify-content-center gap-5 p-3 mt-2 "+styles.FirstSection}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <p className="h1 text-center">Listare faz você mais produtivo</p>
                    <p className="text-center w-50 fs-5">Utilizando o Listare você torna-se extremamente produtivo, organizado e focado.
                    É fácil de utilizar e totalmente customizável!</p>
                    <SignInButton innerText="Usar agora" styles={"bg-green button "+styles.SignInButton}/>
                </div>
                <div>
                    <Image src={"https://img.freepik.com/free-photo/icon-business-target-project-tasks-list-time_107791-15845.jpg?t=st=1736717748~exp=1736721348~hmac=c600a99e61fedc5cfee435bf51a00bfdca0a964bdb10edbed7d5144dfe343977&w=1060"}
                    className={"rounded img-fluid w-100 "+styles.FirstSectionImage} height={500} width={500} alt="To-do-list"
                    />
                </div>
            </section>
            {/* CARDS SECTION */}
            <section className="mt-5 px-5">
                <p className="display-3 text-center">Funcionalidades</p>
                <div className="d-flex justify-content-center"><hr className="w-75"/></div>
                <div className={"d-flex flex-wrap justify-content-center "+styles.DivCards}>
                    <div className={"shadow m-2 rounded "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-vector/deadline-time-management-business-concept_107791-4070.jpg?t=st=1736718820~exp=1736722420~hmac=e3e7dce62626823183af0a1eae327e432f99d45a836260ad655795961f8583ab&w=1380"}
                        className="rounded-top  img-fluid w-100 h-50" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Tags</p>
                            <p className="text-center">Listare permite você adicionar tags para suas listas, fazendo o processo mais organizado e dinâmico</p>
                            <SignInButton innerText="Usar" styles={"bg-green "+styles.SignInButton}/>
                        </div>
                    </div>
                    <div className={"shadow m-2  rounded  "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-photo/calendar-agenda-event-meeting-reminder-schedule-graphic-concept_53876-124859.jpg?t=st=1736721359~exp=1736724959~hmac=c83feb7064fcb25ac617fea3a74d12893fa57072509222a9367c33b4ffe4bbb2&w=1380"}
                        className="h-50 rounded-top  img-fluid w-100" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Prioridades</p>
                            <p className="text-center">Com o Listare você pode adicionar prioridades para suas listas, e até mesmo criar suas próprias prioridades 
                            de acordo com o prazo, tornando tudo mais atraente e divertido.</p>
                            <SignInButton innerText="Usar" styles={"bg-green "+styles.SignInButton}/>
                        </div>
                    </div>
                    <div className={"shadow m-2 rounded "+styles.Card}>
                        <Image src={"https://img.freepik.com/free-vector/social-media-speech-bubbles_53876-89120.jpg?t=st=1736721501~exp=1736725101~hmac=5b5d6c2b2b810bc20e64ed20c3cbaa628d8052e537b644114837b2addf9c16dc&w=1380"}
                        className="h-50 rounded-top  img-fluid w-100" height={500} width={500} alt="To-do-list"/>
                        <div className="d-flex flex-column align-items-center justify-content-around h-50 p-3">
                            <p>Comparilhamentos</p>
                            <p className="text-center"> Listare te permite compartilhar suas listas com outros usuários, 
                            permitindo a colaboração entre amigos e equipes!</p>
                            <SignInButton innerText="Usar" styles={"bg-green "+styles.SignInButton}/>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className={"position-relative my-5 "+styles.ThirdSection}>
                <img src="/close-up-still-life-hard-exams_23-2149314078.jpg"
                className={"w-100 "+styles.ImageFilter} alt="person working on an desk" />
                <div className={"d-flex flex-column align-items-center position-absolute w-100 top-50 text-white"}>
                    <p className="h1 text-center">Produtivo, Organizado e Eficiente</p>
                    <p>Uma nova forma de conquistar a produtividade e manejar suas tarefas.</p>
                    <SignInButton innerText="Use agora" styles={"button bg-green "+styles.SignInButton}/>
                </div>
            </section>


            <section className={"d-flex flex-column align-items-center p-5 my-5 "+styles.FourthSection}>
                <p className="h1 text-center mb-5">Principais Dúvidas</p>
                <div className={"d-flex justify-content-center w-75 gap-5 "+styles.FAQ}>
                    <div className={" text-center shadow rounded  p-4"}>
                        <p className="h4">Como o Listare vai aumentar sua produtividade?</p>
                        <p>O Listare impulsiona a produtividade centralizando tarefas, automatizando fluxos de 
                        trabalho, facilitando a colaboração e fornecendo acompanhamento e insights claros —
                        tudo em uma única ferramenta.</p>
                    </div>
                    <div className={" text-center shadow  p-4"}>
                        <p className="h4">Qual é a diferença entre o Listare e qualquer outro aplicativo de gerenciamento de tarefas?</p>
                        <p>O Listare é uma opção única na web, oferecendo uma plataforma extremamente fácil de usar,
                        com diversas funcionalidades úteis para garantir que você tenha a melhor experiência possível!</p>
                    </div>
                </div>
                <div className={"d-flex justify-content-center w-75 gap-5 mt-5 "+styles.FAQ}>
                    <div className={" text-center shadow rounded  p-4"}>
                        <p className="h4">Listare funciona para equipes?</p>
                        <p>Sim! O Listare foi desenvolvido para melhorar a produtividade da equipe, permitindo 
                        colaboração fluida, delegação de tarefas e automação de fluxos de trabalho. As equipes
                        podem atribuir tarefas, acompanhar o progresso em tempo real e obter insights valiosos 
                        — tudo em uma plataforma centralizada.</p>
                    </div>
                    <div className={" text-center shadow  p-4"}>
                        <p className="h4">Há alguma versão mobile do Listare?</p>
                        <p>Infelizmente, ainda não há um aplicativo móvel para o Listare. No entanto, 
                        o Listare oferece uma incrível plataforma online que você pode acessar de 
                        qualquer lugar, desde que tenha internet e um dispositivo eletrônico conectado.</p>
                    </div>
                </div>
            </section>
            <section className={"d-flex justify-content-center text-black p-5 mt-5 bg-light "+styles.ContactSection}>
                <div className="d-flex flex-column align-items-center justify-content-start pt-5 w-50">
                    <p className="display-1">Faça contato</p>
                    <p className="fs-5 text-center w-50">Deixe seu comentário preenchendo o formulário abaixo ou envie uma mensagem em nossas redes sociais.</p>
                </div>
                <div className="w-50">
                    <form className={"d-flex flex-column py-5 bg-light rounded p-5 gap-1 w-75  "+styles.ContactForm}>
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" id="name" placeholder="Seu nome" className="rounded" />
                        <label htmlFor="email">Email</label>
                        <input type="email" name="" id="" placeholder="Seu email" className="rounded"/>
                        <label htmlFor="">Mensagem</label>
                        <textarea name="comment" id="comment" className="rounded" rows={7} cols={10} placeholder="Deixe sua mensagem aqui"></textarea>
                        <button className="button bg-green mt-3">Enviar</button>
                    </form>
                </div>
            </section>  

            <FOOTER/>
        </>
    )
}