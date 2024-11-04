import { NextRequest, NextResponse } from 'next/server';
import {verifyToken} from "@/actions/userLogin";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authenticate = async (req: NextRequest, res: NextResponse) => {
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

