"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import {getCookie, deleteCookie} from "cookies-next";
import {Box, Button, Flex, Separator, Tabs, Text} from '@radix-ui/themes';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jwt from 'jsonwebtoken';
import Question from "@/app/container/question";
import userStore from "@/store/userStore";


const Dashboard = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const setUserId = userStore((state) => state.setUserId)

    const handleLogout = async () => {
        deleteCookie("auth-token");
        router.push("../");
    };

    useEffect(() => {
        const token = getCookie("auth-token");
        if (!token) {
            router.push('../');
        } else {
            const decoded = jwt.decode(token);
            setUserId(decoded.userId)
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
                className="h-screen  flex justify-center items-center flex-col"
            >
                <Box className={"h-12 w-full bg-green-800 mb-2 px-4 py-4 flex justify-center items-center" }>
                    <Text className={"text-white font-bold"}> IFCE - CONECTA</Text>
                </Box>
                <Tabs.Root defaultValue="account" className={"w-full"}>
                    <Tabs.List className="text-white" color={"jade"}>
                            <Tabs.Trigger className="text-white" value="question">Questões</Tabs.Trigger>
                            <Tabs.Trigger value="enterprise">Empresas</Tabs.Trigger>
                            <Tabs.Trigger value="laboratory">Laboratorios</Tabs.Trigger>
                            <Tabs.Trigger value="atualizar">Duvidas</Tabs.Trigger>

                        <Button
                            color={"tomato"}
                            className="text-white font-bold py-2 px-4 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="question">
                            <Question/>
                        </Tabs.Content>

                        <Tabs.Content value="enterprise">
                        </Tabs.Content>

                        <Tabs.Content value="laboratory">
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Flex>
        );
    }
    return <div>Redirecionando para login...</div>;
};

export default Dashboard;