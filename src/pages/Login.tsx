import React from "react";
import Container from "../Components/Container";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConnection";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty("Campo obrigatorio"),
  password: z.string().nonempty("campo obrigatorio")
})

type FormData = z.infer<typeof schema>

export default function Login(){
  const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    function onSubmit(data: FormData){
        signInWithEmailAndPassword(auth, data.email, data.password).then(()=>{
           }).catch((error)=>{

            toast.error(`Erro ao entrar na conta`, error)
        })

        if(data.email?.includes("adm")){
          toast.success(`Bem-vindo ao sistema`)
          navigate("/adm", {replace: true})
        }else{
          navigate("/working", {replace: true})
        }
    }
  return(
    <Container>
      <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
      <form className="bg-white max-w-xl w-full p-4 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input  className="w-full border-2 rounded-md h-11 px-2" placeholder="email" {...register("email")}/>
      </div>
      <div className="mb-3">
        <input type="password"  className="w-full border-2 rounded-md h-11 px-2" placeholder="senha" {...register("password")}/>
      </div>
      <button className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium" type="submit"> acessar</button>
      <Link to="/register">Ainda não possui uma conta? Cadastre-se</Link>
      </form>
      </div>
    </Container>
  )
}