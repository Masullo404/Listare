import FOOTER from "@/components/layout/footer"
import NAV from "@/components/layout/nav"
import { SignInButton } from "@/components/layout/signInBtn"
import styles from "../../styles/features/style.module.css"

export default function Features(){
    return(
        <>
            <NAV />
            <main className="p-5">
                <section className={"p-5 d-flex flex-column align-items-center "+styles.FirstSection}>
                    <p className={"display-3 w-75 text-start "+styles.Title}>Gerenciamento de Tarefas</p>
                    <p className="w-75 text-start">Organize suas tarefas e compartilhe listas com facilidade.</p>
                    <br />
                    <div className="d-flex justify-content-center align-items w-75 gap-5">
                        <img src="https://images.unsplash.com/photo-1692158319085-d7d08ad73dfd?auto=format&fit=crop&w=606&h=360" alt="" className="w-50 rounded object-fit-cover" />
                        <div className="align-content-center">
                            <p className="h3">Tags Customizadas</p>
                            <p>Organize suas listas com base em tags totalmente customizáveis por você mesmo.</p>
                        </div>
                    </div>
                    
                    <br />
                    
                    <div className="d-flex justify-content-center align-items w-75 gap-5">
                        <img src="https://images.unsplash.com/photo-1676580674468-57a4e14b1fa1?auto=format&fit=crop&w=606&h=360" alt="" className="w-50 rounded object-fit-cover" />
                        <div className="align-content-center">
                            <p className="h3">Prioridades Definidas</p>
                            <p>Defina prioridades e datas para suas tarefas, garantindo que você sempre saiba o que é mais importante a fazer.</p>
                        </div>
                    </div>
                    
                    <br />

                    <div className="d-flex justify-content-center align-items w-75 gap-5">
                        <img src="https://images.unsplash.com/photo-1601342630314-8427c38bf5e6?auto=format&fit=crop&w=606&h=360" alt="" className="w-50 rounded object-fit-cover" />
                        <div className="align-content-center">
                            <p className="h3">Organização Eficiente</p>
                            <p>Listare permite que você crie listas de tarefas personalizadas, ajudando você a se manter organizado.
                            As listas podem ser compartilhadas e adaptadas, tornando mais fácil cumprir prazos e priorizar o que
                            realmente importa na sua rotina diária de tarefas.</p>
                        </div>
                    </div>
                </section>

                <section className={"d-flex flex-column align-items-center "+styles.SecondSection}>
                    <p className="display-2">Tarefas Customizadas</p>
                    <p>Organize suas tarefas e compartilhe listas com facilidade.</p>
                    <div className="w-75 px-5">   
                        <div className="d-flex gap-2">
                            <img src="https://images.unsplash.com/photo-1663661746218-b46d343e8f4e?auto=format&fit=crop&w=503&h=360" alt="" className="w-50 object-fit-cover rounded" />
                            <img src="https://images.unsplash.com/photo-1677506048148-0c914dd8197b?auto=format&fit=crop&w=503&h=360" alt="" className="w-50 object-fit-cover rounded" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <p className="h3">Gerencia suas tarefas</p>
                                <p>Crie, organize e compartilhe suas listas de tarefas.</p>
                            </div>
                            <SignInButton innerText="Começar" styles="bg-green button px-5 py-3"/>
                        </div>
                    </div>  
                    
                    <br />
                    <br />

                    <div className="w-75 px-5">   
                        <div className="d-flex gap-2">
                            <img src="https://images.unsplash.com/photo-1620325867502-221cfb5faa5f?auto=format&fit=crop&w=503&h=360" alt="" className="w-50 object-fit-cover rounded"  />
                            <img src="https://images.unsplash.com/photo-1697032354256-e87979981a33?auto=format&fit=crop&w=503&h=360" alt="" className="w-50 object-fit-cover rounded" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <div>
                                <p className="h3">Listas Compartilhadas</p>
                                <p>Colabore com amigos e organize tarefas em conjunto.</p>
                            </div>
                            <SignInButton innerText="Começar" styles="bg-green button px-5 py-3"/>
                        </div>
                    </div>  
                </section>

            </main>            
            <FOOTER />
        </>
    )
}