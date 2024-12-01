import {Dialog, Flex} from "@radix-ui/themes"
import React from "react";
import {UpdateIcon} from "@radix-ui/react-icons";
import UpdateQuestion from "@/app/component/UpdateQuestion";



interface DialogUpdateQuestionProps {
    id: string;
    row: Array<string>
    updateQuestions: () => void;
}

const DialogUpdateQuestion: React.FC<DialogUpdateQuestionProps>=({id, row, updateQuestions}) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <UpdateIcon color={"green"} className={"h-5 w-5 cursor-pointer"}/>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title color={"jade"}>  Atualizar Questão </Dialog.Title>
                <Flex direction="column" gap={"3"}>
                    <UpdateQuestion id={id} row={row} updateQuestions={updateQuestions}/>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default  DialogUpdateQuestion