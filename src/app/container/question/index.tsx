"use client"

import React, {useCallback, useEffect, useState} from "react";
import DialogAddQuestion from "@/app/component/DialogAddQuestion";
import TableQuestion from "@/app/component/TableQuestion";
import {Box} from "@radix-ui/themes";
import {questionGetByUserId} from "@/actions/questionGetByUserId";
import userStore from "@/store/userStore";
import {toast, ToastContainer} from "react-toastify";
import DialogUpdateQuestion from "@/app/component/DialogUpdateQuestion";
import DeleteQuestion from "@/app/component/DeleteQuestion";

interface IQuestionsData {
    areaAtuacao: string,
    descricao: string,
    authorId: string,
    id: string,
    titulo: string
}


const Question: React.FC = () => {
    const userId = userStore((state) => state.userId)
    const [questions, setQuestions] = useState<Array<Array<string>>>([[]]);

    const tranformDataToArray = (questions: Array<IQuestionsData>) => {
        return questions.map(question => {
            return [question.id, question.titulo, question.descricao, question.areaAtuacao]
        });
    }

    const fetchMemoized = useCallback(async () => {
        try {
            const datas = await questionGetByUserId(userId) as unknown as Array<IQuestionsData>;
            setQuestions(() => [...tranformDataToArray(datas)]);
        } catch (e) {
            console.error(e);
            toast.error("Erro ao buscar as questões, por favor tente mais tarde");
        }
    }, [userId]);

    const updateQuestions = async () => {
        await fetchMemoized();
    };

    useEffect(() => {
        fetchMemoized();
    }, [fetchMemoized]);

    return (
        <Box className={"p-4 space-y-6"}>
            <DialogAddQuestion updateQuestions={updateQuestions}/>
            <TableQuestion data={questions} Component={DialogUpdateQuestion} ComponenteDelete={DeleteQuestion} updateQuestions={updateQuestions}/>
            <ToastContainer/>
        </Box>
    )
}

export default Question;