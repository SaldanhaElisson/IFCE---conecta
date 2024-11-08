"use client"
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import { getCookie, deleteCookie } from "cookies-next";
import {Button, Flex, Text} from '@radix-ui/themes';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jwt from 'jsonwebtoken';

const Dashboard = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<string>()
    const handleLogout = async () => {
        deleteCookie("auth-token");
        router.push("../");
    };

    useEffect(() => {
        const token = getCookie("auth-token");
        console.log(token)
        if (!token) {
            router.push('../');
        } else {
            const decoded = jwt.decode(token);
            console.log(decoded);
            setUser(decoded.userId)
            fetch('/api/auth', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error || !data.userId) {
                        router.push('/login');
                    } else {
                        setAuthenticated(true);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    router.push('/login');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [router]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (authenticated) {
        return (<Flex
                className="h-screen bg-black flex justify-center items-center flex-col"
            >
                <Text
                    className="text-white text-5xl font-bold"
                >
                    Bem-vindo ao Dashboard - {user}
                </Text>
                <Button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Flex>
        );
    }
    return <div>Redirecionando para login...</div>;
};

export default Dashboard;