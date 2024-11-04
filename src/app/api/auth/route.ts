import type { NextApiRequest, NextApiResponse } from 'next';
import {verifyToken} from "@/actions/userLogin";
import {NextResponse} from "next/server";

const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies = req.cookies;
    console.log(cookies)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const token = cookies._parsed.get('auth-token').value;
    console.log("pegando token")
    console.log(token)
    if (!token) {
        return NextResponse.json({ error: 'Token não encontrado' }, { status: 400 });
    }

    const userId = await verifyToken(token);

    if (!userId) {
        return NextResponse.json({ error: 'Token não encontrado' }, { status: 400 });
    }

    return NextResponse.json({ userId }, {status: 200});
};

export { authenticate as GET };

