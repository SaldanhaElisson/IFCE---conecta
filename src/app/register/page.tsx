"use client";
import { Box, Button, Text, TextField } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Link from "next/link";
import {registerUser} from "@/actions/userRegister";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'


interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

const Registro = () => {

    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await registerUser(data);
            toast.success("Usuário cadastrado com sucesso!");
            router.push("../");
        } catch (error) {
            toast.error("Erro ao cadastrar usuário.");
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    const senha = watch("senha");

    return (
        <div className="flex items-center justify-center min-h-screen sm:p-20 bg-cover bg-no-repeat bg-center bg-[url('../assets/img/bg_login.png')]">
            <Box className="bg-amber-50 md:w-fit md:min-w-[40rem] md:h-fit md:min-h-[30rem] rounded-xl w-screen h-screen p-6 mx-auto">
                <h1 className="text-4xl text-green-500 font-bold hover:text-green-700 transition duration-300 ease-in-out text-center">IFCE - Conecta</h1>
                <Box className="mt-16 w-full px-5 ">
                    <h2 className="text-xl text-green-500 font-bold hover:text-green-700 transition duration-300 ease-in-out mb-4 text-center">Registro</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col items-center space-y-2 justify-center"}>
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="text" {...register("nome", { required: true })} placeholder="Digite seu nome" />
                        {errors.nome && <Text className="text-red-500 text-[10px]">Nome é obrigatório</Text>}
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="email" {...register("email", { required: true })} placeholder="Digite seu email" />
                        {errors.email && <Text className="text-red-500 text-[10px]">Email é obrigatório</Text>}
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="password" {...register("senha", { required: true, minLength: 6 })} placeholder="Digite sua senha" />
                        {errors.senha && <Text className="text-red-500 text-[10px] ">Senha é obrigatória e deve ter pelo menos 6 caracteres</Text>}
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="password" {...register("confirmarSenha", { required: true, validate: (value) => value === senha || "As senhas não coincidem" })} placeholder="Confirme sua senha" />
                        {errors.confirmarSenha && <Text className="text-red-500 text-[10px] ">Senhas não coincidem</Text>}
                        <Button variant={"soft"} size={"3"} type="submit" color={"green"} className="py-2 px-4 text-sm font-medium text-white ">Registrar</Button>
                    </form>
                    <Text as={"p"} className={"text-center mt-6 mb-6"}> Já é cadastrado? </Text>
                    <Link href={"../"}>
                        <Text as={"p"} className={"text-green-600 text-center"}> Entrar </Text>
                    </Link>
                </Box>
            </Box>
            <ToastContainer />
        </div>
    );
};

export default Registro;