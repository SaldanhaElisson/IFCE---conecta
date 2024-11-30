"use server"
import { PrismaClient } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jwt from 'jsonwebtoken';
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();
const secretKey = 'batata';

interface FormData {
    email: string;
    senha: string;
}

export const loginUser = async (formData: FormData) => {

    const { email, senha } = formData;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (user && senha == user.password) {

            console.log(user.id);
            const tokenGenerate = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            setCookie('auth-token', tokenGenerate, { path: '/' });
            return { success: true, user, tokenGenerate };
        } else {
            throw new Error("Credenciais inválidas");
        }
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        throw new Error("Erro ao fazer login");
    }
};

export const verifyToken = async (token: string) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (error) {
        return error;
    }
};
