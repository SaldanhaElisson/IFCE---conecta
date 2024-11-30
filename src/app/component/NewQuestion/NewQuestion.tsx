"use client";
import React from 'react';
import {Box, Button, Select, Text, TextArea, TextField} from '@radix-ui/themes';
import type {SubmitHandler} from 'react-hook-form';
import {Controller, useForm} from 'react-hook-form';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {questionsRegister} from "@/actions/questionRegister";

interface FormData {
    titulo: string;
    descricao: string;
    authorId: string;
    areaAtuacao: string;
}

const NovaQuestao = ({userid}) => {

    console.log(userid);
        const allowedAreas = ["IA", "ENGENHARIA_DE_SOFTWARE", "PESQUISA"];

        const {register, handleSubmit, control, formState: {errors}} = useForm<FormData>();
        const onSubmit: SubmitHandler<FormData> = async (data) => {
            try {
                await questionsRegister({
                    titulo: data.titulo,
                    descricao: data.descricao,
                    areaAtuacao: data.areaAtuacao,
                    authorId: userid

                });
                toast.success("Questão cadastrada com sucesso!");
            } catch (error) {
                toast.error("Erro ao cadastrar questão.");
                console.error("Erro ao cadastrar questão:", error);
            }
        };

        return (
            <Box>
                <Box className="mt-16 px-5 w-full">
                    <h2 className="text-xl text-green-500 font-bold hover:text-green-700 transition duration-300 ease-in-out mb-4 text-center">Cadastrar
                        Questão</h2>

                    <form onSubmit={handleSubmit(onSubmit)}
                          className={"w-full flex flex-col items-center space-y-4 justify-center"}>

                        <TextField.Root size="2" radius="full" className="w-full max-w-96"
                                        type="text" {...register("titulo", {required: true})}
                                        placeholder="Digite o título"/>
                        {errors.titulo && <Text className="text-red-500 text-[10px]">Título é obrigatório</Text>}

                        <TextArea size="3" radius="full"
                                  className="w-full max-w-96"  {...register("descricao", {required: true})}
                                  placeholder="Digite a descrição"/>
                        {errors.descricao && <Text className="text-red-500 text-[10px]">Descrição é obrigatória</Text>}


                        <Box className="w-full max-w-96"> <Controller name="areaAtuacao" control={control} defaultValue=""
                                                                      rules={{required: true}} render={({field}) => (
                            <Select.Root {...field} onValueChange={field.onChange}>
                                <Select.Trigger placeholder="Selecione a área de atuação"/>
                                <Select.Content>
                                    <Select.Item value="IA">IA</Select.Item>
                                    <Select.Item value="ENGENHARIA_DE_SOFTWARE">Engenharia de Software</Select.Item>
                                    <Select.Item value="PESQUISA">Pesquisa</Select.Item>
                                </Select.Content>
                            </Select.Root>)}/>

                            {errors.areaAtuacao &&
                                <Text className="text-red-500 text-[10px]">Área de atuação é obrigatória</Text>} </Box>

                        <Button variant={"soft"} size={"3"} type="submit" color={"green"}
                                className="py-2 px-4 text-sm font-medium text-white ">Cadastrar</Button>
                    </form>
                </Box>
                <ToastContainer/>
            </Box>
        )
            ;
    }
;

export default NovaQuestao;
