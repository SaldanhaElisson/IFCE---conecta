"use client";
import {Box, Button, Select, Text, TextField} from '@radix-ui/themes';
import {Controller, useForm} from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import {registerUser} from "@/actions/userRegister";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";


interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    typeUser: string,
    mat: string
}

const AddUser = () => {

    const { register, handleSubmit, watch,control,  formState: { errors } } = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await registerUser(data);
            toast.success("Usuário cadastrado com sucesso!");
        } catch (error) {
            toast.error("Erro ao cadastrar usuário.");
            console.error("Erro ao cadastrar usuário:", error);
        }
    };

    const senha = watch("senha");

    return (
        <>
            <Box>
                <Box className="mt-16 w-full px-5 ">
                    <h2 className="text-xl text-green-500 font-bold hover:text-green-700 transition duration-300 ease-in-out mb-4 text-center">Cadastro de Usuários</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col items-center space-y-2 justify-center"}>
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="text" {...register("nome", { required: true })} placeholder="Digite seu nome" />
                        {errors.nome && <Text className="text-red-500 text-[10px]">Nome é obrigatório</Text>}
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="email" {...register("email", { required: true })} placeholder="Digite seu email" />
                        {errors.email && <Text className="text-red-500 text-[10px]">Email é obrigatório</Text>}

                        <TextField.Root size="2"   radius="full" className="w-full max-w-96" type="number" {...register("mat", { required: true, minLength: 6 })} placeholder="Digite a Matrículo ou CNPJ da empresa." />
                        {errors.mat && <Text className="text-red-500 text-[10px]">Matriculo ou CNPJ é obrigatório e deve ter pelo menos 11 caracteres</Text>}

                        {errors.email && <Text className="text-red-500 text-[10px]">Email é obrigatório</Text>}
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="password" {...register("senha", { required: true, minLength: 6 })} placeholder="Digite sua senha" />
                        {errors.senha && <Text className="text-red-500 text-[10px] ">Senha é obrigatória e deve ter pelo menos 6 caracteres</Text>}
                        <TextField.Root size="2" radius="full" className="w-full max-w-96" type="password" {...register("confirmarSenha", { required: true, validate: (value) => value === senha || "As senhas não coincidem" })} placeholder="Confirme sua senha" />
                        {errors.confirmarSenha && <Text className="text-red-500 text-[10px] ">Senhas não coincidem</Text>}

                        <Box className="w-full flex flex-col max-w-96">
                            <Controller name="typeUser" control={control} defaultValue="" rules={{required: true}}
                                        render={({field}) => (
                                            <Select.Root {...field} onValueChange={field.onChange}>
                                                <Select.Trigger placeholder="Selecione o tipo de usuário"/>
                                                <Select.Content>
                                                    <Select.Item value="Professor">Professor</Select.Item>
                                                    <Select.Item value="Administrador">Administrador</Select.Item>
                                                    <Select.Item value="Empresa">Empresa</Select.Item>
                                                </Select.Content>
                                            </Select.Root>)}/>

                            {errors.typeUser &&
                                <Text className="text-red-500 text-[10px]">Área de atuação é obrigatória</Text>}
                        </Box>


                        <Button variant={"soft"} size={"3"} type="submit" color={"green"} className="py-2 px-4 text-sm font-medium text-white ">Registrar</Button>
                    </form>
                </Box>
            <ToastContainer />
            </Box>
       </>
    );
};

export default AddUser;