"use server";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const questionGetByUserId = async (userId: string) => {

    try {
        return await prisma.question.findMany({where: {authorId: userId}});
    } catch (error) {
        console.log(error);
        console.error("Erro ao cadastrar questão:", error);
        throw new Error("Erro ao cadastrar questão");
    }
};