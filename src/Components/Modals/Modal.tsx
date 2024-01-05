import { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import '../../index.css'

interface ModalProps{
  visible: boolean;
  children: ReactNode;
  action: string;
  onClose: ()=> void;
}

export default function Modal({visible, children, onClose, action}: ModalProps){

if(visible === true){
  return(
    <div className="modal">
    <div className="container">
      <button className="close" onClick={onClose}>
        <FiX size={25} color="#FFF" />
        Voltar
      </button>

      <main>
      {children}

      </main>
    </div>
  </div>
  )
}else{
  return <></>
}
  

}

/* bg-[rgba(0,0,0, 0.6)] */