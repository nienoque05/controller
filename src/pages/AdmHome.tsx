import React, { useContext, useEffect, useState } from "react";
import Container from "../Components/Container";
import PanelHeader from "../Components/PanelHeader";
import {AiOutlineFileSearch} from 'react-icons/ai'
import { Link } from "react-router-dom";
import { FiEdit3, FiX } from "react-icons/fi";
import { AuthContext } from "../Context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConnection";
import { GoCheck } from "react-icons/go";
import { CiFlag1 } from "react-icons/ci";
interface PedidoProps{
  id: string;
  cliente: string;
  descricao: string;
  status: boolean;
  solicitante: string;
}
export default function AdmHome(){
  const [modalVisible, setModalVisible] = useState(false)
  const [pedidos, setPedidos] = useState<PedidoProps[]>([])
  const { user} = useContext(AuthContext)
  useEffect(()=>{
    function loadPedido(){
      if(!user?.uid){
        return;
      }
      const pedidosRef = collection(db, "pedidos")

      getDocs(pedidosRef).then((snapshot) => {
        let listPedidos = [] as PedidoProps[];
        snapshot.forEach(doc => {
          listPedidos.push({
            id: doc.id,
            cliente: doc.data().cliente,
            descricao: doc.data().descricao,
            status: doc.data().status,
            solicitante: doc.data().solicitante
          })
        })
        setPedidos(listPedidos)
      })
    }
    loadPedido()
  },[user])

  return(
  <>
   <Container>
    <PanelHeader/>
        <div className="flex justify-center items-center flex-col">
         {pedidos?.length === 0 ? <span className="text-white">Ainda não há registros</span> : <>   <table>
       <thead>
         <tr>
           <th scope="col">Cliente</th>
           <th scope="col">Serviço</th>
           <th scope="col">Status</th>
           <th scope="col">Solicitante</th>
          <th scope="col">#</th>
         </tr>
       </thead>
       <tbody>
         {pedidos.map((item) => (
               <tr>
               <td data-label="Cliente">
                {item?.cliente}
               </td>
               <td data-label="Pedido">
                 {item?.descricao}
               </td>
               <td data-label="Status">
                 <span className="badge">
                  {item?.status === true ? <p> Aberto </p> : <p> Encerrado </p>}
                 </span>
               </td>
              <td data-label="solicitante">
                <span> {item?.solicitante}</span>
              </td>
               <td data-label="#">
                 <button  className="action" style={{ backgroundColor: '#1ed456' }}>
                 <GoCheck size={20} />
                 </button>
                 <button className="action" style={{ backgroundColor: '#dd1411' }}>
                   <CiFlag1 color='#FFF' size={20}/>
                 </button>
                 
               </td>
             </tr>
            ))}
           
      
       </tbody>
     </table>   </>}
     
    
         </div>
    </Container>
   
   </>
  )
}