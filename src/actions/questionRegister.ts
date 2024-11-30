"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

interface FormData {
    titulo: string;
    descricao: string;
    authorId: string;
    areaAtuacao: string;
}

export const questionsRegister = async (formData: FormData) => {
    const {titulo, descricao, authorId, areaAtuacao} = formData;
    try {
        return await prisma.question.create({data: {titulo, descricao, authorId, areaAtuacao,},});
    } catch (error) {
        console.log(error);
        console.error("Erro ao cadastrar questão:", error);
        throw new Error("Erro ao cadastrar questão");
    }
};