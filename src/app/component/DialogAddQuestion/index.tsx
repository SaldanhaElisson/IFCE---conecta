import {Button, Dialog, Flex} from "@radix-ui/themes"
import React from "react";
import NewQuestion from "../AddQuestion";




interface DialogAddQuestionProps {
    updateQuestions: () => void;
}
const DialogAddQuestion: React.FC<DialogAddQuestionProps>=({updateQuestions}) => {

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Adicionar Questão</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title color={"jade"}>  Cadastrar Questões </Dialog.Title>
                <Flex direction="column" gap={"3"}>
                    <NewQuestion updateQuestions={updateQuestions}/>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export default  DialogAddQuestion