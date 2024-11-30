"use client"
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation'
import { getCookie, deleteCookie } from "cookies-next";
import {Box, Button, Flex, Section, Separator, Tabs, Text} from '@radix-ui/themes';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import jwt from 'jsonwebtoken';
import NewQuestion from "@/app/component/NewQuestion/NewQuestion";

const Dashboard = () => {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userid, setUserId] = useState<string>()
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
                <Box className={"h-16"}>

                </Box>
                <Separator my="3" size="4" />
                <Tabs.Root defaultValue="account" className={"w-full"}>
                    <Tabs.List className="text-white" color={"jade"}>
                        <Tabs.Trigger className="text-white" value="cadastrar">Cadastrar</Tabs.Trigger>
                        <Tabs.Trigger value="deletar">Deletar</Tabs.Trigger>
                        <Tabs.Trigger value="atualizar">Visualizar</Tabs.Trigger>
                        <Tabs.Trigger value="visualizar">Atualizar</Tabs.Trigger>

                        <Button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="cadastrar">
                            <NewQuestion userid={userid}/>
                        </Tabs.Content>

                        <Tabs.Content value="deletar">
                            <Text size="2">Access and update your documents.</Text>
                        </Tabs.Content>

                        <Tabs.Content value="visualizar">
                            <Text size="2">Edit your profile or update contact information.</Text>
                        </Tabs.Content>
                    </Box>


                </Tabs.Root>


            </Flex>
        );
    }
    return <div>Redirecionando para login...</div>;
};

export default Dashboard;