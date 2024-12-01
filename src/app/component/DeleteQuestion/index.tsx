import {TrashIcon} from "@radix-ui/react-icons";
import questionDelete from "@/actions/questionDelete";
import {toast} from "react-toastify";
import React from "react";

interface DeleteQuestionProps {
    id: string,
    updateQuestions: () => void,
}

const DeleteQuestion: React.FC<DeleteQuestionProps> = ({id, updateQuestions}) => {

    const questionDeleteHandle = async () => {
        try {

            await questionDelete(id);
            toast.success("Questão deletada");
            updateQuestions()
        }catch (error) {
            console.error(error);
            toast.error("erro ao deletar a questão");
        }
    }

    return (
        <>
            <TrashIcon  color={"red"} className={"cursor-pointer h-5 w-5 cursor-pointer"} onClick={questionDeleteHandle}></TrashIcon>
        </>
    )
}

export default  DeleteQuestion