import { ReactNode, useContext, useState } from "react";
import { FiX } from "react-icons/fi";
import '../../index.css'
import { act } from "react-dom/test-utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";


const schema = z.object({
  cliente: z.string().nonempty("Campo cliente é obrigatório"),
  descricao: z.string().nonempty("Campo obrigatorio"),
  
})
type FormData = z.infer<typeof schema>
interface ModalProps{
  visible: boolean;
  children?: ReactNode;
  action: string;
  onClose: ()=> void;
}



export default function CreatePedidoModal({visible, children, onClose, action}: ModalProps){
  const {register, handleSubmit, reset ,formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
})
const {user} = useContext(AuthContext)
async function onSubmit (data: FormData){
  addDoc(collection(db, "pedidos"),{
    cliente: data.cliente,
    descricao: data.descricao,
    status: true,
    solicitante : user?.name
  }).then(()=>{
    toast.success("Pedido enviado com sucesso")
    reset()
  }).catch(()=>{
    toast.error("Erro em enviar o pedido")
  })

}
  if(visible === true){
    return(
      <div className="modal">
      <div className="container">
        <button className="close" onClick={onClose}>
          <FiX size={25} color="#FFF" />
          Voltar
        </button>
        <h2>{action}</h2>
         <main>
         <form className="flex flex-col max-w-xl w-full p-4 rounded-lg items-center justify-center gap-5" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("cliente")} placeholder="Nome Cliente" className="w-full border-2 rounded-md h-11 px-2" />
          <textarea {...register("descricao")} placeholder="Detalhes do pedido" className="w-full border-2 rounded-md h-28 max-h-28 px-2" />
          <button type="submit" className="bg-[#1ed456] w-full rounded-md text-black h-10 font-medium">Salvar</button>
         </form>
        </main>
      </div>
    </div>
    )
  }else{
    return <></>
  }
    
  
}