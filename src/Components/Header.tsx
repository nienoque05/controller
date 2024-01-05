import { BsDatabaseGear } from "react-icons/bs";
import {FiUser, FiLogIn} from 'react-icons/fi'

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";


export default function Header(){
  const {signed, loadingAuth, user} = useContext(AuthContext)
  return(
   <div className="w-full flex items-center justify-center h-15 bg-[#1d1d1d] drop-shadow mb-4">
    <header className="flex w-full items-center justify-between max-w-7xl px-4 mx-auto">
    <BsDatabaseGear size={34} color="#FFF" />
    <div className="flex gap-2">
      <FiUser size={34} color="#FFF"/>
     <div className="flex flex-col">
     {!signed ? 
      <>
      <strong className="text-white">Entre</strong>
      <span className="text-zinc-100">Ou Cadastre-se</span>
      </>
     : <>
     <strong className="text-white">Olá, {user?.name}</strong>
     <span className="text-zinc-100">{user?.email}</span></>}
     </div>
     </div>
    </header>
   </div>
  )
}

