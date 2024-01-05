import React, { useContext, useState } from "react";
import Container from "../Components/Container";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import { AuthContext } from "../Context/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const schema = z.object({
  name: z.string().nonempty("Campo nome é obrigatório"),
  email: z.string().email("Insira um email válido").nonempty("Campo obrigatorio"),
  password: z.string().min(6, "DEVE CONTER PELO MENOS 6 CARACTERES").nonempty("campo obrigatorio")
})
type FormData = z.infer<typeof schema>
export default function Register(){
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate()
  const {handleInfoUser} = useContext(AuthContext)

  const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
})
async  function onSubmit(data: FormData){
   createUserWithEmailAndPassword(auth, data.email, data.password).then(async (user)=>{
    await updateProfile(user.user, {
        displayName: data.name
    })
    handleInfoUser({
        name: data.name,
        email: data.email,
         uid: user.user.uid})
       
   }).catch((error)=>{
    console.log("erro ao cadastrar este usuário", error)
   })
   if(data.email?.includes("adm")){
    toast.success(`Bem-vindo ao sistema ${data?.name}`)
    navigate("/adm", {replace: true})
   }else{
    navigate("/working", {replace: true})
   }
}
  return(
    <Container>
      <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
      <form className="bg-white max-w-xl w-full p-4 rounded-lg"  onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input  className="w-full border-2 rounded-md h-11 px-2" placeholder="nome" {...register("name")}/>
      </div>
      <div className="mb-3">
        <input  className="w-full border-2 rounded-md h-11 px-2" placeholder="email" {...register("email")}/>
      </div>
      <div className="mb-3">
        <input type="password"  className="w-full border-2 rounded-md h-11 px-2" placeholder="senha" {...register("password")}/>
      </div>
      <button className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium" type="submit"> Acessar</button>
      </form>
      </div>
    </Container>
  )
}