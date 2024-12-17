"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface FormData {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    mat: string;
}

export const registerUser = async (formData: FormData) => {

    const { nome, email, senha, mat } = formData;
    try {
        const user = await prisma.user.create({
            data: {
                nome,
                email,
                password: senha,
                mat: mat,
                userType: "administrador"
            }
        });
        return user;
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw new Error("Erro ao cadastrar usuário");
    }
};