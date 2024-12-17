"use client";
import React from 'react';
import {Box, Button, Select, Text, TextArea, TextField} from '@radix-ui/themes';
import type {SubmitHandler} from 'react-hook-form';
import {Controller, useForm} from 'react-hook-form';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {questionUpdate} from "@/actions/questionUpdate";

interface FormData {
    titulo: string;
    descricao: string;
    authorId: string;
    areaAtuacao: string;
}


interface UpdateQuestionProps {
    id: string,
    row: Array<string>,
    updateQuestions: () => void,
}

const UpdateQuestion: React.FC<UpdateQuestionProps> = ({id, row, updateQuestions}) => {

    const {register, handleSubmit, control, formState: {errors}} = useForm<FormData>(
        {
            defaultValues: {
                titulo: row[1],
                descricao: row[2],
                areaAtuacao: row[3],
            },
        }
    );
    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            await questionUpdate({
                id: id,
                titulo: data.titulo,
                descricao: data.descricao,
                areaAtuacao: data.areaAtuacao,
            });
            toast.success("Questão Atualizada com sucesso!");
            updateQuestions()
        } catch (error) {
            toast.error("Erro ao atualizar a questão.");
            console.error("Erro ao atualizar questão:", error);
        }
    };

    return (
        <Box>
            <Box className="mt-3 px-5 w-full">
                <form onSubmit={handleSubmit(onSubmit)}
                      className={"w-full flex flex-col items-center space-y-4 justify-center"}>

                    <TextField.Root size="2" radius="full" className="w-full max-w-96"
                                    type="text" {...register("titulo")}
                                    placeholder="Digite o título"/>
                    {errors.titulo && <Text className="text-red-500 text-[10px]">Título é obrigatório</Text>}

                    <TextArea size="3" radius="full"
                              className="w-full max-w-96"  {...register("descricao")}
                              placeholder="Digite a descrição"/>
                    {errors.descricao && <Text className="text-red-500 text-[10px]">Descrição é obrigatória</Text>}

                    <Box className="w-full flex flex-col max-w-96">
                        <Controller name="areaAtuacao" control={control} defaultValue=""
                                    render={({field}) => (
                                        <Select.Root {...field} onValueChange={field.onChange}>
                                            <Select.Trigger placeholder="Selecione a área de atuação"/>
                                            <Select.Content>
                                                <Select.Item value="IA">IA</Select.Item>
                                                <Select.Item value="ENGENHARIA_DE_SOFTWARE">Engenharia de
                                                    Software</Select.Item>
                                                <Select.Item value="PESQUISA">Pesquisa</Select.Item>
                                            </Select.Content>
                                        </Select.Root>)}/>

                        {errors.areaAtuacao &&
                            <Text className="text-red-500 text-[10px]">Área de atuação é obrigatória</Text>}
                    </Box>

                    <Button size={"3"} type="submit" color={"green"}
                            className="py-2 px-4 text-sm font-medium text-white ">Cadastrar</Button>
                </form>
            </Box>
            <ToastContainer/>
        </Box>
    )
}

export default UpdateQuestion;

