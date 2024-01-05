import { Link, useNavigate } from "react-router-dom";
import CreatePedidoModal from "./Modals/CreatePedido";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConnection";


export default function PanelHeader(){
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  async function handleLogout(){
    await signOut(auth)
    navigate("/")

}
  return(
   <>
    <div className="w-full items-center flex mb-4 h-10 bg-[#1ed456] rounded-lg text-black gap-4 px-4">
         <button onClick={()=> setVisible(true)}>
          Novo Pedido
         </button>
        <Link to="/working">
           Lista de pedidos
        </Link>
        <Link to="/dashboard/new">
            
        </Link>
        <button   className="ml-auto" onClick={handleLogout}>Sair da conta</button>
    </div>
    <CreatePedidoModal visible={visible} onClose={()=>setVisible(false)} action="Novo pedido" />
   </>
  )
}