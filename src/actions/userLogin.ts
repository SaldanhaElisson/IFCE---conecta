"use server"
import {PrismaClient} from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jwt from 'jsonwebtoken';
import {setCookie} from "cookies-next";

const prisma = new PrismaClient();
const secretKey = 'batata';

interface FormData {
    email: string;
    senha: string;
}

export const loginUser = async (formData: FormData) => {

    const { email, senha } = formData;

    try {
        const user = await prisma.user.findFirst({ where: { email: email } });

        if (user && senha == user.password) {

            const tokenGenerate = jwt.sign({ userId: user.id, userType: user.userType }, secretKey, { expiresIn: '1h' });
            setCookie('auth-token', tokenGenerate, { path: '/' });
            return { success: true, user, tokenGenerate };
        } else {
            throw new Error("Credenciais inválidas");
        }
    } catch (error) {
        console.log(error);
        console.error("Erro ao fazer login:", error);
        throw new Error("Erro ao fazer login");
    }
};

export const verifyToken = async (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return error;
    }
};
