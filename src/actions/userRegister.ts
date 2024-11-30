"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
}

export const registerUser = async (formData: FormData) => {

    const { nome, email, senha } = formData;
    try {
        const user = await prisma.user.create({
            data: {
                nome,
                email,
                password: senha,
            },
        });
        return user;
    } catch (error) {
        console.log(error);
        console.error("Erro ao cadastrar usuário:", error);
        throw new Error("Erro ao cadastrar usuário");
    }
};